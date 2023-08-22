import { g_entities } from 'entities';
import { Entity } from 'entities/entity';
import { map } from 'maps';

export class Grid {
  public bgGrid: HTMLDivElement;
  public htmlGrid: HTMLDivElement;
  public uiHtmlGrid: HTMLDivElement;
  public entities: Entity[];

  public colCount = 48;
  public rowCount = 27;
  public tileSize = 32;

  constructor() {
    this.entities = g_entities;
    this.bgGrid = document.createElement('div');
    this.bgGrid.style.display = 'grid';
    this.bgGrid.style.gridTemplateColumns = `repeat(${this.colCount}, 1fr)`;
    this.bgGrid.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`;
    this.bgGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.bgGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.bgGrid.style.backgroundColor = 'white';
    this.bgGrid.style.margin = 'auto';

    this.htmlGrid = document.createElement('div');
    this.htmlGrid.style.position = 'absolute';
    this.htmlGrid.style.display = 'grid';
    this.htmlGrid.style.gridTemplateColumns = `repeat(${this.colCount},1fr)`;
    this.htmlGrid.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`;
    this.htmlGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.htmlGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.htmlGrid.style.margin = 'auto';
    document.body.insertAdjacentElement('afterbegin', this.bgGrid);
    this.genEls();

    this.uiHtmlGrid = document.createElement('div');
    this.uiHtmlGrid.style.position = 'absolute';
    this.uiHtmlGrid.style.display = 'grid';
    this.uiHtmlGrid.style.gridTemplateColumns = `repeat(${this.colCount},1fr)`;
    this.uiHtmlGrid.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`;
    this.uiHtmlGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.uiHtmlGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.uiHtmlGrid.style.margin = 'auto';
    this.bgGrid.appendChild(this.uiHtmlGrid);
  }

  genEls() {
    this.bgGrid.innerHTML = '';
    const els = map.map((tile) => {
      const tileE = document.createElement('div');
      tileE.style.backgroundColor = tile;
      return tileE;
    });

    els.forEach((e) => this.bgGrid.appendChild(e));
    this.entities.forEach((e) => e.render(this.htmlGrid));
    this.bgGrid.appendChild(this.htmlGrid);
  }

  unrenderUiGrid() {
    this.uiHtmlGrid.innerHTML = '';
    this.uiHtmlGrid.remove();
  }
}
