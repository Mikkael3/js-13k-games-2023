import { grid } from 'main';
import { getUiState, updateUiState } from 'state';

const units = ['Peasant', 'Tower', 'Rice farmer'];
const actions = ['Next wave'];

export class MainMenu {
  public menuContainer: HTMLDivElement;
  public openElement?: HTMLDivElement;

  constructor() {
    this.menuContainer = document.createElement('div');
    this.menuContainer.style.backgroundColor = 'white';
    this.menuContainer.style.gridArea = `1/42/28/49`;
    this.menuContainer.style.display = 'flex';
    this.menuContainer.style.flexDirection = 'column';
    grid.uiGrid.appendChild(this.menuContainer);
    this.renderMenu();
  }

  handleSelection = () => {
    if (this.openElement) {
      this.openElement.remove();
      this.openElement = undefined;
    }

    const uiState = getUiState();

    if (!uiState.activeUnit) return;

    const selectionElement = document.createElement('div');
    selectionElement.style.backgroundColor = 'black';
    selectionElement.style.display = 'flex';
    selectionElement.style.flexDirection = 'row';
    selectionElement.style.color = 'white';
    selectionElement.textContent = uiState.activeUnit;

    this.menuContainer.appendChild(selectionElement);

    this.openElement = selectionElement;
  };

  renderMenu() {
    units.forEach((e) => {
      const element = document.createElement('div');
      element.style.backgroundColor = 'gray';
      element.style.width = `100%`;
      element.style.cursor = 'pointer';
      element.textContent = e;
      element.onclick = () => {
        const state = getUiState();
        state.activeUnit = e;
        updateUiState(state);
        this.handleSelection();
      };
      this.menuContainer.appendChild(element);
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
      this.menuContainer.appendChild(element);
    });
  }
}
