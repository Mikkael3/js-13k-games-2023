import { MainEntity } from 'entities/main-entity';
import { Grid } from 'grid';
import { MainMenu } from 'ui/main-menu';

export type State = {
  uiState: {
    activeUnit: null | string;
  };
};

let state: State = {
  uiState: {
    activeUnit: null,
  },
};

export const getState = () => state;

export const updateState = (newState: State) => {
  state = newState;
};

export const grid = new Grid();

export const mainEntity = new MainEntity(grid);

grid.entityGrid.appendChild(mainEntity.element);

new MainMenu();
