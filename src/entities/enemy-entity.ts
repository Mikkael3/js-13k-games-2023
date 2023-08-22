import { Entity } from 'entities/entity';

export const enemyTick = (entity: Entity) => {
  return {
    ...entity,
    gridX: entity.gridX + 1,
  };
};
