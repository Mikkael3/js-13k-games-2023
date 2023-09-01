import 'globals.ts';
import { initControls } from 'controller';
import { Grid } from 'grid';
import {
  getEnemiesState,
  getState,
  getSystemState,
  getTowersState,
  updateEnemiesState,
  updateSystemState,
  updateTowersState,
} from 'state';
import { createEnemyAt, isEnemy, moveEnemy } from './entities/enemy-entity.ts';
import { renderUi } from './ui/main-ui.ts';
import { makeTower, shootTowersTick } from './entities/tower-entity.ts';
import { getNextSpawns, wave1 } from './waves.ts';

export const grid = new Grid();

export const initEntities = () => {
  const towers1 = [...Array(4)].map((_, index) => makeTower(18, 8 + 2 * index));
  const towers2 = [...Array(4)].map((_, index) => makeTower(25, 9 + 2 * index));
  updateTowersState([...getTowersState(), ...towers1, ...towers2]);
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
  if (!getSystemState().waveStarted) return;
  updateEnemiesState(getEnemiesState().map((e) => moveEnemy(e)));
  // Spawn enemies
  if (getState().system.waveStarted) {
    // updateEnemiesState([...getEnemiesState(), createEnemyAt(10, 10)]);
    const newEnemies = getNextSpawns(wave1, getSystemState().timer);
    if (newEnemies.length > 0) {
      updateEnemiesState([...getEnemiesState(), ...newEnemies]);
    }
  }

  /// Remove enemies if they leave the grid
  updateEnemiesState(
    getEnemiesState().filter((entity) => {
      return entity.gridX < grid.colCount;
    }),
  );
  // Reset enemies as not taking damage
  updateEnemiesState(
    getEnemiesState().map((entity) => {
      return isEnemy(entity) ? { ...entity, takingDamage: false } : entity;
    }),
  );
  // Shoot towers
  shootTowersTick();

  // Debug
  window.state = getState();
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

renderUi(grid);
initControls();
initEntities();
runGameLoop();
