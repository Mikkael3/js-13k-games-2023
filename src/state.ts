import { Entity } from './entities/entity.ts';

export type UiState = {
  activeUnit: null | string;
};

export type State = {
  uiState: UiState;
  enemies: Entity[];
};

let state: State = {
  uiState: {
    activeUnit: null,
  },
  enemies: [],
};

// get fresh and juicy copy of state
export const getState = () => JSON.parse(JSON.stringify(state));

export const updateState = (newState: State) => {
  state = newState;
};

// Get copy of UI state
export const getUiState = () => getState().uiState;

export const updateUiState = (newState: UiState) =>
  updateState({
    ...getState(),
    uiState: newState,
  });
