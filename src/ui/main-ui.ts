import { Grid } from 'grid';
import { getSystemState, getUiState, updateSystemState, updateUiState } from 'state';

type Action = {
  name: string;
  handler: (grid: Grid) => () => void;
};
const units = ['Peasant', 'Tower', 'Rice farmer', 'Creeper'];
const actions: Action[] = [
  {
    name: 'Next Wave',
    handler: (grid: Grid) => () => {
      updateSystemState({ ...getSystemState(), waveStarted: true });
      renderUi(grid);
    },
  },
];

const waveActions: Action[] = [
  {
    name: 'Use Skill',
    handler: (grid: Grid) => () => {
      console.log(grid);
      alert(getSystemState().wave);
    },
  },
];

export const renderUi = (grid: Grid) => {
  grid.uiHtmlGrid.innerHTML = '';
  const uiContainer = renderUiContainer(grid);
  renderStatus(uiContainer);
  renderUnits(uiContainer, grid);
  renderActions(uiContainer, grid);
};

const renderUiContainer = (grid: Grid) => {
  const menuHtmlContainer = document.createElement('div');
  menuHtmlContainer.style.backgroundColor = 'white';
  menuHtmlContainer.style.gridArea = `1/42/28/49`;
  menuHtmlContainer.style.display = 'grid';
  menuHtmlContainer.style.gridTemplateColumns = `repeat(${1}, 1fr)`;
  menuHtmlContainer.style.gridTemplateRows = `repeat(${6},1fr)`;
  grid.uiHtmlGrid.appendChild(menuHtmlContainer);
  return menuHtmlContainer;
};

const renderStatus = (container: HTMLDivElement) => {
  const element = document.createElement('div');
  element.style.backgroundColor = 'orange';
  element.style.width = `100%`;
  element.style.cursor = 'pointer';
  element.textContent = `Wave ${getSystemState().wave}/10`;
  container.appendChild(element);
};

const renderUnits = (container: HTMLDivElement, grid: Grid) => {
  const state = getUiState();
  units.forEach((e) => {
    const element = document.createElement('div');
    element.style.backgroundColor = 'gray';
    if (e === state.activeUnit) element.style.backgroundColor = 'red';
    element.style.width = `100%`;
    element.style.cursor = 'pointer';
    element.textContent = e;
    element.onclick = () => {
      const state = getUiState();
      state.activeUnit = e;
      updateUiState(state);
      renderUi(grid);
    };
    container.appendChild(element);
  });
};

const renderActions = (container: HTMLDivElement, grid: Grid) => {
  const currentActions = getSystemState().waveStarted ? waveActions : actions;

  currentActions.forEach((e) => {
    const element = document.createElement('div');
    element.style.backgroundColor = 'blue';
    element.style.color = 'white';
    element.style.width = `100%`;
    element.style.cursor = 'pointer';
    element.textContent = e.name;
    element.onclick = e.handler(grid);
    container.appendChild(element);
  });
};