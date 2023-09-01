import { Entity, Stats } from 'entities/entity';
import { grid } from '../main.ts';
import { isTower } from './tower-entity.ts';
import { getTowersState } from 'state.ts';

export type EnemyEntity = Entity & {
  name: 'enemy';
  stats: Stats;
  // Is it taking damage this tick
  takingDamage?: boolean;
  // Cooldown on moving. If it's 0 the unit can move. It's set to 'speed' value after moving
  moveCd: number;
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
export const moveEnemy = (enemy: EnemyEntity) => {
  if (enemy.stats.hp <= 0) {
    return enemy;
  }
  if (enemy.moveCd > 0) {
    return { ...enemy, moveCd: enemy.moveCd - 1 };
  }
  const newGridX = enemy.gridX + 1;
  const collidedWithEntity = getTowersState().find((entity) => {
    // Avoids other enemies that would move out of the way, but maybe it doesn't matter
    return isTower(entity) && newGridX === entity.gridX && enemy.gridY === entity.gridY;
  });
  if (collidedWithEntity) {
    // Can't move forward so move to the side. Not checking if there is anything for now
    return {
      ...enemy,
      gridY: enemy.gridY + 1,
      moveCd: enemy.stats.speed,
    };
  }
  return {
    ...enemy,
    gridX: newGridX,
    moveCd: enemy.stats.speed,
  };
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
    moveCd: 0,
  };
  return enemy;
};
