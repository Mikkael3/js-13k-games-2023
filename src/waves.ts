import { EnemyEntity } from './entities/enemy-entity.ts';

export type EnemyType = 'basicEnemy' | 'fasterEnemy';

export type Wave = {
  // Groups spawn all at once but "delay" can be used to control when groups spawn
  groups: Array<{
    type: EnemyType;
    x: number;
    y: number;
    count: number;
    // How many ticks between spawns
    interval: number;
    // How many ticks to wait until starting to spawn enemies
    delay: number;
  }>;
};

const enemyCreatorByEnemyType: Record<EnemyType, (x: number, y: number) => EnemyEntity> = {
  basicEnemy: (x: number, y: number) => {
    return {
      name: 'enemy',
      color: 'red',
      type: 'basicEnemy',
      gridX: x,
      gridY: y,
      stats: {
        hp: 8,
        attack: 2,
        speed: 1,
        defence: 2,
      },
      moveCd: 0,
    };
  },
  fasterEnemy: (x: number, y: number) => {
    return {
      name: 'enemy',
      color: 'hotpink',
      type: 'fasterEnemy',
      gridX: x,
      gridY: y,
      stats: {
        hp: 2,
        attack: 1,
        speed: 0,
        defence: 1,
      },
      moveCd: 0,
    };
  },
};

export const wave1: Wave = {
  groups: [
    // {
    //   type: 'basicEnemy',
    //   x: 10,
    //   y: 10,
    //   count: 3,
    //   interval: 5,
    //   delay: 0,
    // },
    {
      type: 'fasterEnemy',
      x: 10,
      y: 12,
      count: 3,
      interval: 2,
      delay: 0,
    },
    // {
    //   type: 'basicEnemy',
    //   x: 10,
    //   y: 13,
    //   count: Infinity,
    //   interval: 5,
    //   delay: 20,
    // },
  ],
};

export const wave2: Wave = {
  groups: [
    {
      type: 'basicEnemy',
      x: 10,
      y: 10,
      count: 4,
      interval: 2,
      delay: 0,
    },
    {
      type: 'fasterEnemy',
      x: 10,
      y: 15,
      count: 4,
      interval: 2,
      delay: 0,
    },
  ],
};

export const waves = [wave1, wave2, wave2, wave2, wave2, wave2, wave2, wave2, wave2, wave2];

/**
 * Returns the new enemies that are spawned on this tick
 * @param waveNumber
 * @param originalWaveTick Ticks since start of wave (start at 0)
 */
export const getNextSpawns = (waveNumber: number, originalWaveTick: number): EnemyEntity[] => {
  if (waveNumber > waves.length) {
    console.log('No more waves remaining. You win, I guess.');
    return [];
  }
  const shouldSpawnEnemy = (spawn: Wave['groups'][number]) => {
    // Subtract delay from original tick value
    const tick = originalWaveTick - spawn.delay;
    return (
      tick >= 0 && // has passed delay
      tick % spawn.interval === 0 && // it's time to spawn
      spawn.count > tick / spawn.interval // there is still enemies to spawn
    );
  };
  const wave = waves[waveNumber - 1];
  const spawns = wave.groups.filter(shouldSpawnEnemy);
  const enemies = spawns.map((group) => {
    const createEnemyFn = enemyCreatorByEnemyType[group.type];
    return createEnemyFn(group.x, group.y);
  });

  return enemies;
};
