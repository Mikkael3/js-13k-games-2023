import { MainEntity } from 'entities/main-entity';
import { Grid } from 'grid';
import { MainMenu } from 'ui/main-menu';

export const grid = new Grid();

export const mainEntity = new MainEntity(grid);

// Html elementti
grid.htmlGrid.appendChild(mainEntity.element);

new MainMenu();
