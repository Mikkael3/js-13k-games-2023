import { initControls, initEntities, runGameLoop } from 'controller';
import { Grid } from 'grid';
import { MainMenu } from 'ui/main-menu';

export const grid = new Grid();

new MainMenu();

initControls();
initEntities();
runGameLoop();