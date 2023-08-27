import { Entity } from './entity.ts';
import { EnemyEntity, isEnemy } from './enemy-entity.ts';
import { getEntitiesState, updateEntitiesState } from '../state.ts';

export type TowerEntity = Entity & {
  name: 'tower';
  stats: {
    attack: number;
    range: number;
  };
  // Position of target that tower is shooting at
  targetPosition?: { x: number; y: number };
};

export const isTower = (entity: Entity): entity is TowerEntity => entity.name === 'tower';

export const renderTower = (entity: TowerEntity, element: HTMLDivElement) => {
  if (entity.targetPosition) {
    element.style.backgroundColor = 'white';
  }
};

export const shootTowersTick = () => {
  getEntitiesState().forEach((tower, index) => {
    if (!isTower(tower)) {
      return;
    }
    shootTargetInRange(tower, index);
  });
};

// Shoots and damages enemy in range (if any).
// Updates entity state of shot enemy and tower.
export const shootTargetInRange = (tower: TowerEntity, towerIndex: number) => {
  const entities = getEntitiesState();
  const shotEnemyIndex = entities.findIndex((enemy) => {
    if (!isEnemy(enemy)) return false;
    // Distance is grid distance. Difference of X and Y coordinates added together
    const distance = Math.abs(enemy.gridX - tower.gridX) + Math.abs(enemy.gridY - tower.gridY);
    return distance <= tower.stats.range && enemy.stats.hp > 0;
  });

  const newEntities = getEntitiesState();
  if (shotEnemyIndex > -1) {
    const shotEnemy = entities[shotEnemyIndex] as EnemyEntity;
    const newTower: TowerEntity = {
      ...tower,
      targetPosition: { x: shotEnemy.gridX, y: shotEnemy.gridY },
    };
    newEntities[towerIndex] = newTower;
    const newEnemy: EnemyEntity = {
      ...shotEnemy,
      stats: { ...shotEnemy.stats, hp: shotEnemy.stats.hp - tower.stats.attack },
      takingDamage: true,
    };
    newEntities[shotEnemyIndex] = newEnemy;
  } else {
    // No target was shot. Set tower as not shooting
    const newTower: TowerEntity = {
      ...tower,
      targetPosition: undefined,
    };
    newEntities[towerIndex] = newTower;
  }

  updateEntitiesState(newEntities);
};
