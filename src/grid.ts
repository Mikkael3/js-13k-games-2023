import { entities } from 'entities';
import { Entity } from 'entities/entity';
import { map } from 'maps';

export class Grid {
  public bgGrid: HTMLDivElement;
  public entityGrid: HTMLDivElement;
  public battleGrid: HTMLDivElement;
  public entities: Entity[];
  public colCount = 48;
  public rowCount = 27;
  public tileSize = 32;

  constructor() {
    this.entities = entities;
    this.bgGrid = document.createElement('div');
    this.bgGrid.style.display = 'grid';
    this.bgGrid.style.gridTemplateColumns = `repeat(${this.colCount}, 1fr)`;
    this.bgGrid.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`;
    this.bgGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.bgGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.bgGrid.style.backgroundColor = 'white';
    this.bgGrid.style.margin = 'auto';

    this.entityGrid = document.createElement('div');
    this.entityGrid.style.position = 'absolute';
    this.entityGrid.style.display = 'grid';
    this.entityGrid.style.gridTemplateColumns = `repeat(${this.colCount},1fr)`;
    this.entityGrid.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`;
    this.entityGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.entityGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.entityGrid.style.margin = 'auto';
    document.body.insertAdjacentElement('afterbegin', this.bgGrid);
    this.genEls();

    this.battleGrid = document.createElement('div');
    this.battleGrid.style.position = 'absolute';
    this.battleGrid.style.display = 'grid';
    this.battleGrid.style.gridTemplateColumns = 'repeat(10, 1fr)';
    this.battleGrid.style.gridTemplateRows = 'repeat(8,1fr)';
    this.battleGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.battleGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.battleGrid.style.margin = 'auto';
    this.battleGrid.style.backgroundColor = 'white';
  }

  genEls() {
    this.bgGrid.innerHTML = '';
    const els = map.map((tile) => {
      const tileE = document.createElement('div');
      tileE.style.backgroundColor = tile;
      return tileE;
    });

    els.forEach((e) => this.bgGrid.appendChild(e));
    this.entities.forEach((e) => e.render(this.entityGrid));
    this.bgGrid.appendChild(this.entityGrid);
  }

  renderBattleGrid() {
    this.bgGrid.appendChild(this.battleGrid);
  }

  unrenderBattleGrid() {
    this.battleGrid.innerHTML = '';
    this.battleGrid.remove();
  }
}
