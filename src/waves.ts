import { EnemyEntity } from './entities/enemy-entity.ts';

export type EnemyType = 'basicEnemy' | 'fasterEnemy';

export type Wave = {
  spawnPoint: { x: number; y: number };
  spawns: Array<{
    type: EnemyType;
    count: number;
    // How many ticks between spawns
    interval: number;
    // How many ticks to wait until starting to spawn enemies
    delay?: number;
  }>;
};

const enemyCreatorByEnemyType: Record<EnemyType, (x: number, y: number) => EnemyEntity> = {
  basicEnemy: (x: number, y: number) => {
    return {
      name: 'enemy',
      color: 'red',
      gridX: x,
      gridY: y,
      stats: {
        hp: 10,
        attack: 2,
        speed: 1,
        defence: 2,
      },
    };
  },
  fasterEnemy: (x: number, y: number) => {
    return {
      name: 'enemy',
      color: 'green',
      gridX: x,
      gridY: y,
      stats: {
        hp: 6,
        attack: 1,
        speed: 0,
        defence: 1,
      },
    };
  },
};

export const wave1: Wave = {
  spawnPoint: { x: 10, y: 10 },
  spawns: [
    {
      type: 'basicEnemy',
      count: 4,
      interval: 2,
    },
    {
      type: 'fasterEnemy',
      count: Infinity,
      interval: 1,
      delay: 8,
    },
  ],
};

/**
 *
 * @param wave
 * @param waveTick Ticks since start of wave (start at 0)
 */
// export const getNextSpawn = (wave: Wave, waveTick: number): EnemyEntity[] => {
//   const enemies = wave.spawns.map((spawn) => {
//     const createEnemy = enemyCreatorByEnemyType[spawn.type];
//     // TODO check if delay and interval matches to the tick
//     // const enemy = createEnemy(wave.spawnPoint);
//     return '';
//   });
//
//   return enemies;
// };
