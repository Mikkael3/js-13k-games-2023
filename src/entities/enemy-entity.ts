import { Entity, Stats } from 'entities/entity';
import { grid } from '../main.ts';
import { isTower } from './tower-entity.ts';
import { getTowersState } from 'state.ts';

export type EnemyEntity = Entity & {
  name: 'enemy';
  stats: Stats;
  // Is it taking damage this tick
  takingDamage?: boolean;
  // takingDamage voisi olla sen sijaan:
  // effects: [{ takingDamage: boolean; ticks: 1 }];
  // Jos olisi muita efektejä kuten poisoned
};

export const isEnemy = (entity: Entity): entity is EnemyEntity => entity.name === 'enemy';

export const renderEnemy = (entity: EnemyEntity, element: HTMLDivElement) => {
  if (entity.takingDamage) {
    element.style.backgroundColor = 'orange';
  }
  if (entity.stats.hp <= 0) {
    element.style.backgroundColor = 'black';
  }
};

/**
 * Moves entity if it's enemy
 */
export const moveEnemy = (selfEntity: EnemyEntity, allEntities: EnemyEntity[]) => {
  if (selfEntity.stats.hp <= 0) {
    return selfEntity;
  }
  console.log(allEntities);
  const newGridX = selfEntity.gridX + 1;
  const collidedWithEntity = getTowersState().find((entity) => {
    // Avoids other enemies that would move out of the way, but maybe it doesn't matter
    return isTower(entity) && newGridX === entity.gridX && selfEntity.gridY === entity.gridY;
  });
  if (collidedWithEntity) {
    // Can't move forward so move to the side. Not checking if there is anything for now
    return {
      ...selfEntity,
      gridY: selfEntity.gridY + 1,
    };
  }
  return {
    ...selfEntity,
    gridX: newGridX,
  };
};

export const createEnemyOnCoast = () => {
  const y = Math.ceil(Math.random() * (grid.rowCount - 1));
  const enemy: EnemyEntity = {
    color: 'red',
    gridX: 11,
    gridY: y,
    name: 'enemy',
    stats: {
      hp: 5,
      attack: 1,
      defence: 1,
      speed: 0,
    },
  };
  return enemy;
};

export const createEnemyAt = (x: number, y: number) => {
  const enemy: EnemyEntity = {
    color: 'red',
    gridX: x,
    gridY: y,
    name: 'enemy',
    stats: {
      hp: 10,
      attack: 1,
      defence: 1,
      speed: 0,
    },
  };
  return enemy;
};
