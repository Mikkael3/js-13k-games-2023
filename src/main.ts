import { initControls } from 'controller';
import { Grid } from 'grid';
import {
  getEntitiesState,
  getState,
  getSystemState,
  updateEntitiesState,
  updateSystemState,
} from 'state';
import { createEnemyOnCoast, moveEnemy } from './entities/enemy-entity.ts';
import { randomInt } from './math.ts';
import { renderMenu } from './ui/main-menu.ts';

export const grid = new Grid();

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
  const towers = [...Array(40)].map(() => makeTower());
  updateEntitiesState([...getEntitiesState(), ...towers]);
};

const sleep = async () => {
  await new Promise((resolve) => setTimeout(resolve, 266));
};

/**
 * Run game systems that make up the game logic. I.e. run ticks.
 */
export const runGameSystems = () => {
  updateEntitiesState(getEntitiesState().map((e) => moveEnemy(e, getEntitiesState())));
  if (getState().system.timer % 5 === 0) {
    updateEntitiesState([...getEntitiesState(), createEnemyOnCoast()]);
  }
};

export const runGameLoop = async () => {
  for (;;) {
    const system = getSystemState();
    updateSystemState({ ...system, timer: system.timer + 1 });
    runGameSystems();
    grid.genEls();
    await sleep();
  }
};

renderMenu(grid);
initControls();
initEntities();
runGameLoop();
