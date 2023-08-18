import { CollectableEntity } from 'entities/collectable-entity';
import { EnemyEntity } from 'entities/enemy-entity';
import { NpcEntity } from 'entities/npc-entity';

export const entities = [
  new NpcEntity({
    mapX: 0,
    mapY: 0,
    color: 'blue',
    gridX: 6,
    gridY: 2,
    texts: ['Elämä on kurjaa', 'Hukkasin lihanpalan ja kolikon'],
  }),
  new EnemyEntity({
    mapX: 0,
    mapY: 0,
    color: 'red',
    gridX: 5,
    gridY: 3,
    name: 'Thug',
    stats: {
      hp: 5,
      attack: 1,
      defence: 1,
      speed: 0,
    },
  }),
  new CollectableEntity({
    mapX: 0,
    mapY: 0,
    color: 'yellow',
    gridX: 7,
    gridY: 3,
    name: 'coin',
  }),
  new CollectableEntity({
    mapX: 0,
    mapY: 0,
    color: 'yellow',
    name: 'meat',
    gridX: 8,
    gridY: 3,
  }),
  new CollectableEntity({
    mapX: 0,
    mapY: 0,
    color: 'yellow',
    name: 'air',
    gridX: 9,
    gridY: 3,
  }),
];
