import 'globals.ts';
import { initControls } from 'controller';
import { Grid } from 'grid';
import {
  getEnemiesState,
  getPlayerState,
  getState,
  getSystemState,
  getTowersState,
  updateEnemiesState,
  updatePlayerState,
  updateSystemState,
  updateTowersState,
} from 'state';
import { isEnemy, moveEnemy } from './entities/enemy-entity.ts';
import { renderUi } from './ui/main-ui.ts';
import { makeTower, shootTowersTick } from './entities/tower-entity.ts';
import { getNextSpawns } from './waves.ts';
import { isInsideVillage } from './entities/village.ts';
import { renderEndScreen } from 'ui/end-screen.ts';

export const grid = new Grid();

export const initEntities = () => {
  const towers1 = [...Array(8)].map((_, index) => makeTower(18, 12 + 1 * index));
  const towers2 = [...Array(7)].map((_, index) => makeTower(25, 8 + 1 * index));
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
  if (getPlayerState().life <= 0) {
    updateSystemState({ ...getSystemState(), waveStarted: false });
    renderEndScreen(grid, 'You lost. Your country is ruined and burned!');
    return;
  }

  // Move enemies
  updateEnemiesState(getEnemiesState().map((e) => moveEnemy(e)));
  // Deal damage if enemies reach village
  getEnemiesState().forEach((enemy, enemyIndex) => {
    if (isInsideVillage(enemy.gridX, enemy.gridY)) {
      // Remove the enemy
      updateEnemiesState(getEnemiesState().filter((_, eIndex) => eIndex !== enemyIndex));
      updatePlayerState({ ...getPlayerState(), life: getPlayerState().life - enemy.stats.attack });
      // Render UI so the value actually updates
      renderUi(grid);
    }
  });

  // Spawn enemies
  if (getState().system.waveStarted) {
    const newEnemies = getNextSpawns(getSystemState().wave, getSystemState().timer);
    if (newEnemies.length > 0) {
      updateEnemiesState([...getEnemiesState(), ...newEnemies]);
    }
  }
  // Remove enemies if they leave the grid
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

  if (
    getEnemiesState().length === 0 &&
    getSystemState().waveStarted &&
    getSystemState().wave < 10
  ) {
    // Wave is over
    updateSystemState({ ...getSystemState(), waveStarted: false });
    updateSystemState({ ...getSystemState(), wave: getSystemState().wave + 1 });
    console.log('Wave over');
    renderUi(grid);
  }

  if (
    getEnemiesState().length === 0 &&
    getSystemState().waveStarted &&
    getSystemState().wave >= 10
  ) {
    // game is over logic
    updateSystemState({ ...getSystemState(), waveStarted: false });
    renderEndScreen(grid, 'Invaders chased away! Victory is yours! ');
    return;
  }

  const system = getSystemState();
  // Update timer
  updateSystemState({ ...system, timer: system.timer + 1 });
  // Debug
  window.state = getState();
};

export const runGameLoop = async () => {
  for (;;) {
    runGameSystems();
    grid.genEls();
    await sleep();
  }
};

renderUi(grid);
initControls();
initEntities();
runGameLoop();
