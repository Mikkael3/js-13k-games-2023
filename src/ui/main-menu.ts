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
      renderMenu(grid);
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

export const renderMenu = (grid: Grid) => {
  grid.uiHtmlGrid.innerHTML = '';
  const menuContainer = renderMenuContainer(grid);
  renderMenuItems(menuContainer, grid);
};

const renderMenuContainer = (grid: Grid) => {
  const menuHtmlContainer = document.createElement('div');
  menuHtmlContainer.style.backgroundColor = 'white';
  menuHtmlContainer.style.gridArea = `1/42/28/49`;
  menuHtmlContainer.style.display = 'flex';
  menuHtmlContainer.style.flexDirection = 'column';
  grid.uiHtmlGrid.appendChild(menuHtmlContainer);
  return menuHtmlContainer;
};

const renderMenuItems = (container: HTMLDivElement, grid: Grid) => {
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
      renderMenu(grid);
    };
    container.appendChild(element);
  });

  const currentActions = getSystemState().waveStarted ? waveActions : actions;

  currentActions.forEach((e) => {
    const element = document.createElement('div');
    element.style.backgroundColor = 'blue';
    element.style.color = 'white';
    element.style.width = `100%`;
    element.style.cursor = 'pointer';
    element.style.marginTop = '50%';
    element.textContent = e.name;
    element.onclick = e.handler(grid);
    container.appendChild(element);
  });
};
