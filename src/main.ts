import { MainEntity } from 'entities/main-entity';
import { Grid } from 'grid';
import { MainMenu } from 'ui/main-menu';

export const grid = new Grid();

export const mainEntity = new MainEntity(grid);

grid.entityGrid.appendChild(mainEntity.element);

new MainMenu();
