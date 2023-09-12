import { Entity } from './entity.ts';
import { EnemyEntity } from './enemy-entity.ts';
import {
  getEnemiesState,
  getTowersState,
  updateEnemiesState,
  updateTowersState,
} from '../state.ts';

export type TowerType = 'Peasant' | 'Tower' | 'Rice Farmer' | 'Creeper';
export const units: Readonly<TowerType[]> = ['Peasant', 'Tower', 'Rice Farmer', 'Creeper'] as const;

export const UnitPrices: { [key in TowerType]: number } = {
  ['Rice Farmer']: 900,
  ['Peasant']: 100,
  ['Tower']: 400,
  ['Creeper']: 200,
};

export const UpdatePaths: { [key in TowerType]: { name: string; price: number }[] } = {
  ['Rice Farmer']: [],
  ['Peasant']: [],
  ['Tower']: [
    { name: 'Wooden pagoda', price: 300 },
    { name: 'Stone pagoda', price: 500 },
  ],
  ['Creeper']: [],
};

export type TowerEntity = Entity & {
  name: TowerType;
  stats: {
    attack: number;
    range: number;
  };
  selected: boolean;
  // Position of target that tower is shooting at
  targetPosition?: { x: number; y: number };
};

export const isTower = (entity: Entity): entity is TowerEntity =>
  units.includes(entity.name as TowerType);

export const renderTower = (entity: TowerEntity, element: HTMLDivElement) => {
  element.style.background = 'transparent';
  element.style.backgroundImage = `url('/t1.png')`;
  element.style.backgroundSize = 'cover';
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

export const makeTower = (x: number, y: number, type: TowerType = 'Tower'): TowerEntity => {
  return {
    color: 'purple',
    gridX: x,
    gridY: y,
    name: type,
    selected: false,
    stats: {
      // TODO temporarily does 0 damage
      attack: 0,
      range: 2,
    },
  };
};
