import { entities } from 'entities';
import { Entity } from 'entities/entity';
import { map } from 'maps';

export class Grid {
  public bgGrid: HTMLDivElement;
  public entityGrid: HTMLDivElement;
  public uiGrid: HTMLDivElement;
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

    this.uiGrid = document.createElement('div');
    this.uiGrid.style.position = 'absolute';
    this.uiGrid.style.display = 'grid';
    this.uiGrid.style.gridTemplateColumns = `repeat(${this.colCount},1fr)`;
    this.uiGrid.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`;
    this.uiGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.uiGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.uiGrid.style.margin = 'auto';
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
    this.bgGrid.appendChild(this.uiGrid);
  }

  unrenderBattleGrid() {
    this.uiGrid.innerHTML = '';
    this.uiGrid.remove();
  }
}
