import { Entity } from 'entities/entity';
import { grid } from '../main.ts';

/**
 * Moves entity if it's enemy
 */
export const moveEnemy = (selfEntity: Entity, allEntities: Entity[]) => {
  if (selfEntity.name !== 'enemy') {
    return selfEntity;
  }
  const newGridX = selfEntity.gridX + 1;
  const collidedWithEntity = allEntities.find((ent) => {
    // Avoids other enemies that would move out of the way, but maybe it doesn't matter
    return selfEntity !== ent && newGridX === ent.gridX && selfEntity.gridY === ent.gridY;
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
  const enemy: Entity = {
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
  const enemy: Entity = {
    color: 'red',
    gridX: x,
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
