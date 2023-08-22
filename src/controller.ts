import { enemyTick } from 'entities/enemy-entity';
import { Entity } from 'entities/entity';
import { grid } from 'main';
import { getEntitiesState, getSystemState, updateEntitiesState, updateSystemState } from 'state';

export const initControls = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'j') {
      const y = Math.ceil(Math.random() * (grid.colCount - 1));
      const enemy: Entity = {
        color: 'red',
        gridX: 11,
        gridY: y,
        name: 'mongool',
        stats: {
          hp: 5,
          attack: 1,
          defence: 1,
          speed: 0,
        },
      };
      updateEntitiesState([...getEntitiesState(), enemy]);
    }
  });
};

const sleep = async () => {
  await new Promise((resolve) => setTimeout(resolve, 266));
};

export const runTicks = () => {
  console.log(getEntitiesState());
  const newEntities = getEntitiesState().map((e) => enemyTick(e));
  updateEntitiesState(newEntities);
};

export const runTick = async () => {
  for (;;) {
    const system = getSystemState();
    updateSystemState({ ...system, timer: system.timer + 1 });
    getSystemState().timer % 10 === 0 && console.log('ticking along', getSystemState().timer);
    runTicks();
    grid.genEls();
    await sleep();
  }
};
