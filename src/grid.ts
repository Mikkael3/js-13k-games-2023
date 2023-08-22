import { renderEntity } from 'entities/entity';
import { map } from 'maps';
import { getEntitiesState } from 'state';

export class Grid {
  public bgGrid: HTMLDivElement;
  public entityGrid: HTMLDivElement;
  public uiHtmlGrid: HTMLDivElement;

  public colCount = 48;
  public rowCount = 27;
  public tileSize = 32;

  constructor() {
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

    this.uiHtmlGrid = document.createElement('div');
    this.uiHtmlGrid.style.position = 'absolute';
    this.uiHtmlGrid.style.display = 'grid';
    this.uiHtmlGrid.style.gridTemplateColumns = `repeat(${this.colCount},1fr)`;
    this.uiHtmlGrid.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`;
    this.uiHtmlGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.uiHtmlGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.uiHtmlGrid.style.margin = 'auto';
  }

  genEls() {
    this.bgGrid.innerHTML = '';
    const els = map.map((tile) => {
      const tileE = document.createElement('div');
      tileE.style.backgroundColor = tile;
      return tileE;
    });
    this.entityGrid.innerHTML = '';
    els.forEach((e) => this.bgGrid.appendChild(e));
    getEntitiesState().forEach((e) => renderEntity(e, this.entityGrid));
    this.bgGrid.appendChild(this.entityGrid);
    this.bgGrid.appendChild(this.uiHtmlGrid);
  }

  unrenderUiGrid() {
    this.uiHtmlGrid.innerHTML = '';
    this.uiHtmlGrid.remove();
  }
}
