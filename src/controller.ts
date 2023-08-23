import { createEnemyOnCoast, moveEnemy } from 'entities/enemy-entity';
import { Entity } from 'entities/entity';
import { grid } from 'main';
import { gets, getsEntities, getsSystem, putsEntities, putsSystem } from 'state';

export const initControls = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'j') {
      const y = Math.ceil(Math.random() * (grid.colCount - 1));
      const enemy: Entity = {
        color: 'red',
        gridX: 11,
        gridY: y,
        name: 'enemy',
        stats: {
          hp: 5,
          attack: 1,
          defence: 1,
          speed: 0,
        },
      };
      putsEntities([...getsEntities(), enemy]);
    }
  });
};

const sleep = async () => {
  await new Promise((resolve) => setTimeout(resolve, 266));
};

/**
 * Run game systems that make up the game logic. I.e. run ticks.
 */
export const runGameSystems = () => {
  putsEntities(getsEntities().map((e) => moveEnemy(e)));
  if (gets().system.timer % 10 === 0) {
    putsEntities([...getsEntities(), createEnemyOnCoast()]);
  }
};

export const runTick = async () => {
  for (;;) {
    const system = getsSystem();
    putsSystem({ ...system, timer: system.timer + 1 });
    runGameSystems();
    grid.genEls();
    await sleep();
  }
};
