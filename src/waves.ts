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

const getLineOfEnemies = (
  y: number,
  fasterCount: number,
  basicCount: number,
  delay: number,
): Wave['groups'] => {
  const interval = 2;
  return [
    {
      type: 'fasterEnemy',
      x: 10,
      y,
      count: fasterCount,
      interval,
      delay: delay,
    },
    {
      type: 'basicEnemy',
      x: 10,
      y,
      count: basicCount,
      interval,
      delay: fasterCount * interval + delay,
    },
  ];
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
    {
      type: 'fasterEnemy',
      x: 10,
      y: 11,
      count: 5,
      interval: 2,
      delay: 0,
    },
    {
      type: 'fasterEnemy',
      x: 10,
      y: 17,
      count: 5,
      interval: 2,
      delay: 8,
    },
  ],
};

export const wave2: Wave = {
  groups: [
    {
      type: 'fasterEnemy',
      x: 10,
      y: 11,
      count: 9,
      interval: 2,
      delay: 0,
    },
    {
      type: 'fasterEnemy',
      x: 10,
      y: 17,
      count: 9,
      interval: 2,
      delay: 8,
    },
    {
      type: 'basicEnemy',
      x: 10,
      y: 11,
      count: 1,
      interval: 2,
      delay: 20,
    },
    {
      type: 'basicEnemy',
      x: 10,
      y: 17,
      count: 1,
      interval: 2,
      delay: 28,
    },
  ],
};

export const wave3: Wave = {
  groups: [...wave2.groups, ...getLineOfEnemies(7, 9, 1, 15)],
};

export const waves = [wave1, wave2, wave3];

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
