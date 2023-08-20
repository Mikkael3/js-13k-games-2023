import { grid } from 'main';

export class MainMenu {
  public openElement?: HTMLDivElement;

  constructor() {
    grid.renderBattleGrid();
    this.renderMenu();
  }

  handleFlee() {
    grid.unrenderBattleGrid();
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
    menuElement.style.gridArea = `0/1/1/20`;
    menuElement.style.display = 'flex';
    menuElement.style.flexDirection = 'row';
    grid.uiGrid.appendChild(menuElement);

    const element = document.createElement('div');
    element.style.backgroundColor = 'gray';
    element.style.width = `25%`;
    element.textContent = 'Battle';
    menuElement.appendChild(element);

    const itemsElement = document.createElement('div');
    itemsElement.style.backgroundColor = 'cyan';
    itemsElement.style.width = `25%`;
    itemsElement.textContent = 'Inventory';
    itemsElement.onclick = this.handleInventory;
    menuElement.appendChild(itemsElement);

    const statsElement = document.createElement('div');
    statsElement.style.backgroundColor = 'yellow';
    statsElement.style.width = `25%`;
    statsElement.textContent = 'Stats';
    menuElement.appendChild(statsElement);

    const fleeElement = document.createElement('div');
    fleeElement.style.backgroundColor = 'salmon';
    fleeElement.style.width = `25%`;
    fleeElement.textContent = 'Flee';
    fleeElement.onclick = this.handleFlee;
    menuElement.appendChild(fleeElement);
  }

  characterRender(gridY: number, gridX: number, color: string) {
    const element = document.createElement('div');
    element.style.backgroundColor = color;
    element.style.gridArea = `${gridY}/${gridX}`;
    grid.uiGrid.appendChild(element);
    return element;
  }
}
