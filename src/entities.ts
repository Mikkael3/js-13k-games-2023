import { CollectableEntity } from 'entities/collectable-entity';
import { EnemyEntity } from 'entities/enemy-entity';
import { NpcEntity } from 'entities/npc-entity';

export const g_entities = [
  new NpcEntity({
    color: 'blue',
    gridX: 13,
    gridY: 15,
    texts: ['Elämä on kurjaa', 'Hukkasin lihanpalan ja kolikon'],
  }),
  new EnemyEntity({
    color: 'red',
    gridX: 13,
    gridY: 27,
    name: 'Thug',
    stats: {
      hp: 5,
      attack: 1,
      defence: 1,
      speed: 0,
    },
  }),
  new CollectableEntity({
    color: 'yellow',
    gridX: 20,
    gridY: 3,
    name: 'coin',
  }),
];
