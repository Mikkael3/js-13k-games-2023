import { Entity, renderEntity } from 'entities/entity';
import { TowerEntity, TowerType, UnitPrices, makeTower } from 'entities/tower-entity';
import { map } from 'maps';
import {
  getEnemiesState,
  getPlayerState,
  getTowersState,
  getUiState,
  updatePlayerState,
  updateTowersState,
  updateUiState,
} from 'state';
import { renderUi } from 'ui/main-ui';
import { renderVillage } from './entities/village.ts';

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
    this.uiHtmlGrid.addEventListener('click', this.handleClick(this));
    this.uiHtmlGrid.addEventListener('mousemove', this.handleMouseMove(this));
  }

  handleClick =
    (grid: Grid) =>
    ({ clientX, clientY }: MouseEvent) => {
      const gridX = Math.ceil((clientX - grid.uiHtmlGrid.getBoundingClientRect().left) / 32);
      const gridY = Math.ceil((clientY - grid.uiHtmlGrid.getBoundingClientRect().top) / 32);
      const towerIndex = getTowersState().findIndex(
        (tower) => tower.gridX === gridX && tower.gridY === gridY,
      );

      if (gridX > 41) return;

      let newTower: TowerEntity | null = null;

      if (gridX < 42) {
        if (towerIndex === -1 && getUiState().activeUnit) {
          const price = UnitPrices[getUiState().activeUnit as TowerType];
          if (getPlayerState().rice >= price) {
            newTower = makeTower(gridX, gridY);
            updatePlayerState({ ...getPlayerState(), rice: getPlayerState().rice - price });
          }
        }

        updateUiState({ ...getUiState(), activeUnit: null });
        renderUi(grid);
      }

      updateTowersState([
        ...getTowersState().map((tower, index) => {
          return { ...tower, selected: index === towerIndex };
        }),
        ...(newTower ? [newTower] : []),
      ]);
    };

  handleMouseMove =
    (grid: Grid) =>
    ({ clientX, clientY }: MouseEvent) => {
      const gridX = Math.ceil((clientX - grid.uiHtmlGrid.getBoundingClientRect().left) / 32);
      if (getUiState().activeUnit === null) return;
      if (gridX > 41) {
        renderUi(grid);
        return;
      }
      const gridY = Math.ceil((clientY - grid.uiHtmlGrid.getBoundingClientRect().top) / 32);
      const entity: Entity = {
        gridX,
        gridY,
        color: 'pink',
        name: 'hover-unit',
      };
      renderUi(grid);

      renderEntity(entity, grid.uiHtmlGrid);
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
    renderVillage(this);
    this.bgGrid.appendChild(this.entityGrid);
    this.bgGrid.appendChild(this.uiHtmlGrid);
  }
}
