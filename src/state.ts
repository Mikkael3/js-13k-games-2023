import { Entity } from './entities/entity.ts';

export type SystemState = {
  timer: number;
};

export type UiState = {
  activeUnit: null | string;
};

export type State = {
  uiState: UiState;
  entities: Entity[];
  system: SystemState;
};

let state: State = {
  system: {
    timer: 0,
  },
  uiState: {
    activeUnit: null,
  },
  entities: [],
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

export const getEntitiesState = (): Entity[] => getState().entities;

export const updateEntitiesState = (newEntities: Entity[]) =>
  updateState({
    ...getState(),
    entities: newEntities,
  });

export const getSystemState = (): SystemState => getState().system;

export const updateSystemState = (newSystem: SystemState) =>
  updateState({
    ...getState(),
    system: newSystem,
  });
