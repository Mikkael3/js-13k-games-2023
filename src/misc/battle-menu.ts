import { EnemyEntity } from 'entities/enemy-entity';
import { MainEntity } from 'entities/main-entity';
import { grid, mainEntity } from 'main';

export class BattleMenu {
  public enemy: EnemyEntity;
  public player: MainEntity;
  public openElement?: HTMLDivElement;

  constructor(enemy: EnemyEntity, player: MainEntity) {
    this.enemy = enemy;
    this.player = player;
    grid.renderBattleGrid();
    this.renderMenu();
    this.renderCharacters(enemy, player);
  }

  handleFlee() {
    grid.unrenderBattleGrid();
    mainEntity.busy = false;
  }

  handleBattle = () => {
    if (this.openElement) {
      this.openElement.remove();
      this.openElement = undefined;
      return;
    }
    const battleElement = document.createElement('div');
    battleElement.style.backgroundColor = 'gray';
    battleElement.style.gridArea = `7/1/7/11`;
    battleElement.style.display = 'flex';
    battleElement.style.flexDirection = 'row';
    ['punch', 'defend'].forEach((i) => {
      const iElement = document.createElement('div');
      iElement.style.width = '20%';
      iElement.textContent = i;
      iElement.onclick = () => {
        this.handleFlee();
        this.enemy.defeat();
      };
      battleElement.appendChild(iElement);
    });
    grid.battleGrid.appendChild(battleElement);
    this.openElement = battleElement;
  };

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
    mainEntity.inventory.forEach((i) => {
      const iElement = document.createElement('div');
      iElement.style.width = '20%';
      iElement.textContent = i;
      iElement.onclick = () => {};
      inventoryElement.appendChild(iElement);
    });
    grid.battleGrid.appendChild(inventoryElement);
    this.openElement = inventoryElement;
  };

  handleStats = () => {
    if (this.openElement) {
      this.openElement.remove();
      this.openElement = undefined;
      return;
    }
    const inventoryElement = document.createElement('div');
    inventoryElement.style.backgroundColor = 'yellow';
    inventoryElement.style.gridArea = `7/1/7/11`;
    inventoryElement.style.display = 'flex';
    inventoryElement.style.flexDirection = 'row';
    [this.player, this.enemy].forEach((i) => {
      const iElement = document.createElement('div');
      iElement.style.width = '50%';
      iElement.textContent = `${i.name}: Hp: ${i.stats.hp}, Att: ${i.stats.attack}, Def: ${i.stats.defence}, Speed: ${i.stats?.speed}`;
      iElement.onclick = () => {};
      inventoryElement.appendChild(iElement);
    });
    grid.battleGrid.appendChild(inventoryElement);
    this.openElement = inventoryElement;
  };

  renderMenu() {
    const menuElement = document.createElement('div');
    menuElement.style.backgroundColor = 'yellow';
    menuElement.style.gridArea = `8/1/8/11`;
    menuElement.style.display = 'flex';
    menuElement.style.flexDirection = 'row';
    grid.battleGrid.appendChild(menuElement);

    const element = document.createElement('div');
    element.style.backgroundColor = 'gray';
    element.style.width = `25%`;
    element.textContent = 'Battle';
    element.onclick = this.handleBattle;
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
    statsElement.onclick = this.handleStats;
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
    grid.battleGrid.appendChild(element);
    return element;
  }

  renderCharacters(enemy: EnemyEntity, player: MainEntity) {
    this.characterRender(2, 9, enemy.color);
    this.characterRender(2, 2, player.color);
  }
}
