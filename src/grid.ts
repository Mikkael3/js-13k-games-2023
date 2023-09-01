import { renderEntity } from 'entities/entity';
import { map } from 'maps';
import { getEnemiesState, getTowersState, updateTowersState } from 'state';

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
    document.body.insertAdjacentElement('afterbegin', this.bgGrid);

    this.entityGrid = document.createElement('div');
    this.entityGrid.style.position = 'absolute';
    this.entityGrid.style.display = 'grid';
    this.entityGrid.style.gridTemplateColumns = `repeat(${this.colCount},1fr)`;
    this.entityGrid.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`;
    this.entityGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.entityGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.entityGrid.style.margin = 'auto';

    this.uiHtmlGrid = document.createElement('div');
    this.uiHtmlGrid.style.position = 'absolute';
    this.uiHtmlGrid.style.display = 'grid';
    this.uiHtmlGrid.style.gridTemplateColumns = `repeat(${this.colCount},1fr)`;
    this.uiHtmlGrid.style.gridTemplateRows = `repeat(${this.rowCount},1fr)`;
    this.uiHtmlGrid.style.width = `${this.tileSize * this.colCount}px`;
    this.uiHtmlGrid.style.height = `${this.tileSize * this.rowCount}px`;
    this.uiHtmlGrid.style.margin = 'auto';
    this.uiHtmlGrid.addEventListener('click', this.handleClick(this.uiHtmlGrid));
  }

  handleClick =
    (container: HTMLDivElement) =>
    ({ clientX, clientY }: MouseEvent) => {
      const gridX = Math.ceil((clientX - container.getBoundingClientRect().left) / 32);
      const gridY = Math.ceil((clientY - container.getBoundingClientRect().top) / 32);
      const towerIndex = getTowersState().findIndex(
        (tower) => tower.gridX === gridX && tower.gridY === gridY,
      );
      if (towerIndex >= 0) {
        updateTowersState(
          getTowersState().map((tower, index) => {
            return { ...tower, selected: index === towerIndex };
          }),
        );
      }
    };

  genEls() {
    this.bgGrid.innerHTML = '';
    const els = map.map((tile) => {
      const tileE = document.createElement('div');
      tileE.style.width = `${this.tileSize}px`;
      tileE.style.height = `${this.tileSize}px`;
      tileE.style.backgroundColor = tile;
      return tileE;
    });
    this.entityGrid.innerHTML = '';
    els.forEach((e) => this.bgGrid.appendChild(e));
    getEnemiesState().forEach((e) => renderEntity(e, this.entityGrid));
    getTowersState().forEach((e) => renderEntity(e, this.entityGrid));
    this.bgGrid.appendChild(this.entityGrid);
    this.bgGrid.appendChild(this.uiHtmlGrid);
  }
}
