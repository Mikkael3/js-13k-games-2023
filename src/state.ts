import { Entity } from './entities/entity.ts';

export type SystemState = {
  timer: number;
  wave: number;
  waveStarted: boolean;
};

export type UiState = {
  activeUnit: null | string;
  dialog: string | null;
};

export type State = {
  uiState: UiState;
  entities: Entity[];
  system: SystemState;
  player: PlayerState;
};

export type PlayerState = {
  rice: number;
};

let state: State = {
  system: {
    timer: 0,
    wave: 1,
    waveStarted: false,
  },
  player: {
    rice: 1000,
  },
  uiState: {
    activeUnit: null,
    dialog: null,
  },
  entities: [],
};

// get fresh and juicy copy of state
export const getState = () => JSON.parse(JSON.stringify(state)) as State;

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

export const updateSystemState = (newSystem: Partial<SystemState>) => {
  return updateState({
    ...getState(),
    system: { ...getSystemState(), ...newSystem },
  });
};
