import { Grid } from 'grid';
import { getUiState, updateUiState } from 'state';

const units = ['Peasant', 'Tower', 'Rice farmer', 'Creeper'];
const actions = ['Next wave'];

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

  actions.forEach((e) => {
    const element = document.createElement('div');
    element.style.backgroundColor = 'blue';
    element.style.color = 'white';
    element.style.width = `100%`;
    element.style.cursor = 'pointer';
    element.style.marginTop = '50%';
    element.textContent = e;
    element.onclick = () => alert(e);
    container.appendChild(element);
  });
};
