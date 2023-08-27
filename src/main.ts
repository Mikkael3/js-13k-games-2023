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
import { createEnemyAt, isEnemy, moveEnemy } from './entities/enemy-entity.ts';
import { renderUi } from './ui/main-ui.ts';
import { shootTowersTick, TowerEntity } from './entities/tower-entity.ts';

export const grid = new Grid();

export const initEntities = () => {
  const makeTower = (x: number, y: number): TowerEntity => {
    return {
      color: 'purple',
      gridX: x,
      gridY: y,
      name: 'tower',
      stats: {
        attack: 1,
        range: 2,
      },
    };
  };
  const towers1 = [...Array(4)].map((_, index) => makeTower(18, 8 + 2 * index));
  const towers2 = [...Array(4)].map((_, index) => makeTower(25, 9 + 2 * index));
  updateEntitiesState([...getEntitiesState(), ...towers1, ...towers2]);
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
  updateEntitiesState(getEntitiesState().map((e) => moveEnemy(e, getEntitiesState())));
  // Spawn enemies
  if (getState().system.timer % 3 === 0) {
    if (getState().system.waveStarted) {
      updateEntitiesState([...getEntitiesState(), createEnemyAt(10, 10)]);
    }
  }
  /// Remove enemies if they leave the grid
  updateEntitiesState(
    getEntitiesState().filter((entity) => {
      return entity.gridX < grid.colCount;
    }),
  );
  // Reset enemies as not taking damage
  updateEntitiesState(
    getEntitiesState().map((entity) => {
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
