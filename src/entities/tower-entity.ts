import { Entity } from './entity.ts';
import { EnemyEntity } from './enemy-entity.ts';
import {
  getEnemiesState,
  getTowersState,
  updateEnemiesState,
  updateTowersState,
} from '../state.ts';

export type TowerEntity = Entity & {
  name: 'tower';
  stats: {
    attack: number;
    range: number;
  };
  selected: boolean;
  // Position of target that tower is shooting at
  targetPosition?: { x: number; y: number };
};

export const isTower = (entity: Entity): entity is TowerEntity => entity.name === 'tower';

export const renderTower = (entity: TowerEntity, element: HTMLDivElement) => {
  if (entity.targetPosition) {
    element.style.backgroundColor = 'white';
  }
  if (entity.selected) element.style.border = '1px solid gold';
};

export const shootTowersTick = () => {
  getTowersState().forEach((tower, index) => {
    shootTargetInRange(tower, index);
  });
};

// Shoots and damages enemy in range (if any).
// Updates entity state of shot enemy and tower.
export const shootTargetInRange = (tower: TowerEntity, towerIndex: number) => {
  const enemies = getEnemiesState();
  const shotEnemyIndex = enemies.findIndex((enemy) => {
    // Distance is grid distance. Difference of X and Y coordinates added together
    const distance = Math.abs(enemy.gridX - tower.gridX) + Math.abs(enemy.gridY - tower.gridY);
    return distance <= tower.stats.range && enemy.stats.hp > 0;
  });
  const newTowers = getTowersState();
  const newEnemies = getEnemiesState();
  if (shotEnemyIndex > -1) {
    const shotEnemy = enemies[shotEnemyIndex];
    const newTower: TowerEntity = {
      ...tower,
      targetPosition: { x: shotEnemy.gridX, y: shotEnemy.gridY },
    };
    newTowers[towerIndex] = newTower;
    const newEnemy: EnemyEntity = {
      ...shotEnemy,
      stats: { ...shotEnemy.stats, hp: shotEnemy.stats.hp - tower.stats.attack },
      takingDamage: true,
    };
    newEnemies[shotEnemyIndex] = newEnemy;
  } else {
    // No target was shot. Set tower as not shooting
    const newTower: TowerEntity = {
      ...tower,
      targetPosition: undefined,
    };
    newTowers[towerIndex] = newTower;
  }
  updateEnemiesState(newEnemies);
  updateTowersState(newTowers);
};

export const makeTower = (x: number, y: number): TowerEntity => {
  return {
    color: 'purple',
    gridX: x,
    gridY: y,
    name: 'tower',
    selected: false,
    stats: {
      attack: 1,
      range: 2,
    },
  };
};
