import 'globals.ts';
import { initControls } from 'controller';
import { Grid } from 'grid';
import {
  getEntitiesState,
  getState,
  getSystemState,
  updateEntitiesState,
  updateSystemState,
} from 'state';
import { createEnemyAt, moveEnemy } from './entities/enemy-entity.ts';
import { renderMenu } from './ui/main-menu.ts';

export const grid = new Grid();

export const initEntities = () => {
  const makeTower = (n: number) => {
    return {
      color: 'purple',
      gridX: 18,
      gridY: 8 + 2 * n,
      name: 'tower',
      stats: {
        hp: 5,
        attack: 1,
        defence: 1,
        speed: 0,
      },
    };
  };
  const towers = [...Array(4)].map((_, index) => makeTower(index));
  updateEntitiesState([...getEntitiesState(), ...towers]);
};

const sleep = async () => {
  do {
    await new Promise((resolve) => setTimeout(resolve, window.wait));
    // Keep waiting if pause variable is set
  } while (window.pause);
};

/**
 * Run game systems that make up the game logic. I.e. run ticks.
 */
export const runGameSystems = () => {
  // Move enemies
  updateEntitiesState(getEntitiesState().map((e) => moveEnemy(e, getEntitiesState())));
  // Spawn enemies
  if (getState().system.timer % 5 === 0) {
    if (getState().system.waveStarted) {
      updateEntitiesState([...getEntitiesState(), createEnemyAt(10, 10)]);
    }
  }
  // Remove enemies
  updateEntitiesState(
    getEntitiesState().filter((entity) => {
      return entity.gridX < grid.colCount;
    }),
  );
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
