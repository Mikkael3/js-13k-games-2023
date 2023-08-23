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

/**
 * getState - getS - gets (easier to type)
 */
export const gets = () => JSON.parse(JSON.stringify(state)) as State;

/**
 * updateState - putState - puts
 * @param newState
 */
export const puts = (newState: State) => {
  state = newState;
};

// Get copy of UI state
export const getUiState = () => gets().uiState;

export const updateUiState = (newState: UiState) =>
  puts({
    ...gets(),
    uiState: newState,
  });

export const getsEntities = (): Entity[] => gets().entities;

export const putsEntities = (newEntities: Entity[]) =>
  puts({
    ...gets(),
    entities: newEntities,
  });

export const getsSystem = (): SystemState => gets().system;

export const putsSystem = (newSystem: SystemState) =>
  puts({
    ...gets(),
    system: newSystem,
  });
