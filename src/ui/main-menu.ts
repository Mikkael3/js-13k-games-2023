import { grid } from 'main';

export class MainMenu {
  public elements = ['Peasant', 'Tower', 'Ricefarmer', 'Next wave'];
  public openElement?: HTMLDivElement;

  constructor() {
    this.renderMenu();
  }

  handleInventory = () => {
    if (this.openElement) {
      this.openElement.remove();
      this.openElement = undefined;
      return;
    }
    const inventoryElement = document.createElement('div');
    inventoryElement.style.backgroundColor = 'cyan';
    inventoryElement.style.gridArea = `7/1/7/11`;
    inventoryElement.style.display = 'flex';
    inventoryElement.style.flexDirection = 'row';
    grid.uiGrid.appendChild(inventoryElement);
    this.openElement = inventoryElement;
  };

  renderMenu() {
    const menuElement = document.createElement('div');
    menuElement.style.backgroundColor = 'yellow';
    menuElement.style.gridArea = `1/42/28/49`;
    menuElement.style.display = 'flex';
    menuElement.style.flexDirection = 'column';
    grid.uiGrid.appendChild(menuElement);

    this.elements.forEach((e) => {
      const element = document.createElement('div');
      element.style.backgroundColor = 'gray';
      element.style.width = `100%`;
      element.style.cursor = 'pointer';
      element.textContent = e;
      element.onclick = () => alert(e);
      menuElement.appendChild(element);
    });
  }
}
