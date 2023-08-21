export type UiState = {
  activeUnit: null | string;
};

export type State = {
  uiState: UiState;
};

let state: State = {
  uiState: {
    activeUnit: null,
  },
};

export const getState = () => JSON.parse(JSON.stringify(state));

export const updateState = (newState: State) => {
  state = newState;
};

export const getUiState = () => getState().uiState;

export const updateUiState = (newState: UiState) =>
  updateState({
    ...getState(),
    uiState: newState,
  });
