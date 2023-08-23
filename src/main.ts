import { initControls } from 'controller';
import { Grid } from 'grid';
import { enemyTick } from 'entities/enemy-entity';
import { getEntitiesState, getSystemState, updateEntitiesState, updateSystemState } from 'state';
import { renderMenu } from 'ui/main-menu';

export const grid = new Grid();

initControls();

const sleep = async () => {
  await new Promise((resolve) => setTimeout(resolve, 266));
};

const runTicks = () => {
  console.log(getEntitiesState());
  const newEntities = getEntitiesState().map((e) => enemyTick(e));
  updateEntitiesState(newEntities);
};

(async () => {
  renderMenu(grid);
  for (;;) {
    const system = getSystemState();
    updateSystemState({ ...system, timer: system.timer + 1 });
    getSystemState().timer % 10 === 0 && console.log('ticking along', getSystemState().timer);
    runTicks();
    grid.genEls();
    await sleep();
  }
})();
