import { grid } from 'main';
import { getUiState, updateUiState } from 'state';

const units = ['Peasant', 'Tower', 'Rice farmer'];
const actions = ['Next wave'];

export class MainMenu {
  public menuHtmlContainer: HTMLDivElement;
  public openElement?: HTMLDivElement;

  constructor() {
    this.menuHtmlContainer = document.createElement('div');
    this.menuHtmlContainer.style.backgroundColor = 'white';
    this.menuHtmlContainer.style.gridArea = `1/42/28/49`;
    this.menuHtmlContainer.style.display = 'flex';
    this.menuHtmlContainer.style.flexDirection = 'column';
    grid.uiGrid.appendChild(this.menuHtmlContainer);
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

    this.menuHtmlContainer.appendChild(selectionElement);

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
      this.menuHtmlContainer.appendChild(element);
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
      this.menuHtmlContainer.appendChild(element);
    });
  }
}
