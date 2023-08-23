import { createEnemyOnCoast, moveEnemy } from 'entities/enemy-entity';
import { grid } from 'main';
import { gets, getsEntities, getsSystem, putsEntities, putsSystem } from 'state';
import { randomInt } from './math.ts';

export const initControls = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'j') {
      console.log('pressed j');
    }
  });
};

export const initEntities = () => {
  const coastLineX = 13;
  const rightEdgeX = grid.colCount - 7; // TODO why is right edge of grid not visible
  const makeTower = () => {
    return {
      color: 'purple',
      gridX: randomInt(coastLineX, rightEdgeX),
      gridY: randomInt(1, grid.rowCount - 1),
      name: 'tower',
      stats: {
        hp: 5,
        attack: 1,
        defence: 1,
        speed: 0,
      },
    };
  };
  const towers = [...Array(30)].map(() => makeTower());
  putsEntities([...getsEntities(), ...towers]);
};

const sleep = async () => {
  await new Promise((resolve) => setTimeout(resolve, 266));
};

/**
 * Run game systems that make up the game logic. I.e. run ticks.
 */
export const runGameSystems = () => {
  putsEntities(getsEntities().map((e) => moveEnemy(e, getsEntities())));
  if (gets().system.timer % 10 === 0) {
    putsEntities([...getsEntities(), createEnemyOnCoast()]);
  }
};

export const runGameLoop = async () => {
  for (;;) {
    const system = getsSystem();
    putsSystem({ ...system, timer: system.timer + 1 });
    runGameSystems();
    grid.genEls();
    await sleep();
  }
};
