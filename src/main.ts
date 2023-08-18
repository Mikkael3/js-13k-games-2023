import { MainEntity } from 'entities/main-entity';
import { Grid } from 'grid';

export const grid = new Grid();

export const mainEntity = new MainEntity(grid);

grid.entityGrid.appendChild(mainEntity.element);
