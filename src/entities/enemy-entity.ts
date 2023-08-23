import { Entity } from 'entities/entity';
import { grid } from '../main.ts';

/**
 * Moves entity if it's enemy
 * @param entity
 */
export const moveEnemy = (entity: Entity) => {
  return {
    ...entity,
    gridX: entity.name === 'enemy' ? entity.gridX + 1 : entity.gridX,
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
