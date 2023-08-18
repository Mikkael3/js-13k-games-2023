import { entities } from 'entities';
import { Entity } from 'entities/entity';
import { maps } from 'maps';

export class Grid {
  private mapY: number;
  private mapX: number;
  public bgGrid: HTMLDivElement;
  public entityGrid: HTMLDivElement;
  public battleGrid: HTMLDivElement;
  public entities: Entity[];

  constructor() {
    this.entities = entities;
    this.mapX = 0;
    this.mapY = 0;
    this.bgGrid = document.createElement('div');
    this.bgGrid.style.display = 'grid';
    this.bgGrid.style.gridTemplateColumns = 'repeat(10, 1fr)';
    this.bgGrid.style.gridTemplateRows = 'repeat(8,1fr)';
    this.bgGrid.style.width = '900px';
    this.bgGrid.style.height = '720px';
    this.bgGrid.style.backgroundColor = 'white';
    this.bgGrid.style.margin = 'auto';

    this.entityGrid = document.createElement('div');
    this.entityGrid.style.position = 'absolute';
    this.entityGrid.style.display = 'grid';
    this.entityGrid.style.gridTemplateColumns = 'repeat(10, 1fr)';
    this.entityGrid.style.gridTemplateRows = 'repeat(8,1fr)';
    this.entityGrid.style.width = '900px';
    this.entityGrid.style.height = '720px';
    this.entityGrid.style.margin = 'auto';
    document.body.insertAdjacentElement('afterbegin', this.bgGrid);
    this.genEls();

    this.battleGrid = document.createElement('div');
    this.battleGrid.style.position = 'absolute';
    this.battleGrid.style.display = 'grid';
    this.battleGrid.style.gridTemplateColumns = 'repeat(10, 1fr)';
    this.battleGrid.style.gridTemplateRows = 'repeat(8,1fr)';
    this.battleGrid.style.width = '900px';
    this.battleGrid.style.height = '720px';
    this.battleGrid.style.margin = 'auto';
    this.battleGrid.style.backgroundColor = 'white';
  }

  genEls() {
    this.bgGrid.innerHTML = '';
    const els = maps[this.mapY][this.mapX].map((tile) => {
      const tileE = document.createElement('div');
      tileE.style.backgroundColor = tile;
      return tileE;
    });

    els.forEach((e) => this.bgGrid.appendChild(e));
    this.entities.forEach((e) => e.render(this.mapX, this.mapY, this.entityGrid));
    this.bgGrid.appendChild(this.entityGrid);
  }

  renderBattleGrid() {
    this.bgGrid.appendChild(this.battleGrid);
  }

  unrenderBattleGrid() {
    this.battleGrid.innerHTML = '';
    this.battleGrid.remove();
  }

  getMapY() {
    return this.mapY;
  }

  moveMapY(delta: number): boolean {
    if ((this.mapY + delta >= maps.length && delta) || (this.mapY == 0 && delta < 0)) return false;
    this.mapY += delta;
    this.genEls();

    return true;
  }

  getMapX() {
    return this.mapX;
  }

  moveMapX(delta: number) {
    console.log(maps, this.mapX);
    if ((this.mapX === 0 && delta < 0) || this.mapX + delta >= maps[this.mapY].length) return false;
    this.mapX += delta;
    this.genEls();
    return true;
  }
}
