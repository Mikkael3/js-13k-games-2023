export type Stats = {
  hp: number;
  attack: number;
  defence: number;
  speed: number;
};

export type EntityProps = {
  mapX: number;
  mapY: number;
  gridY: number;
  gridX: number;
  color: string;
  name?: string;
  stats?: Stats;
};

export class Entity {
  public mapX: number;
  public mapY: number;
  private _gridY: number;
  private _gridX: number;
  public color: string;
  public element: HTMLDivElement;
  public rendered = false;
  public stats: Stats;
  public name: string;

  constructor(props: EntityProps) {
    this.element = document.createElement('div');
    this.color = props.color;
    this.element.style.backgroundColor = this.color;
    this.mapX = props.mapX;
    this.mapY = props.mapY;
    this._gridY = props.gridY;
    this._gridX = props.gridX;
    this.element.style.gridArea = `${this.gridY}/${this.gridX}`;
    this.element.style.width = '95%';
    this.element.style.height = '95%';
    this.element.style.justifySelf = 'center';
    this.element.style.alignSelf = 'center';
    this.name = props.name || 'None';
    this.stats = props.stats || {
      hp: 0,
      attack: 0,
      defence: 0,
      speed: 0,
    };
  }

  render(mapX: number, mapY: number, parent: HTMLElement) {
    if (this.mapX === mapX && this.mapY === mapY) {
      parent.appendChild(this.element);
      this.rendered = true;
    } else {
      this.rendered = false;
      this.element.remove();
    }
  }

  get gridY() {
    return this._gridY;
  }

  set gridY(y: number) {
    this._gridY = y;
    this.element.style.gridArea = `${this.gridY}/${this.gridX}`;
  }

  get gridX() {
    return this._gridX;
  }

  set gridX(x: number) {
    this._gridX = x;
    this.element.style.gridArea = `${this.gridY}/${this.gridX}`;
  }

  checkHit(entity: Entity) {
    return this.rendered && this.gridX === entity.gridX && this.gridY === entity.gridY;
  }

  handleHit(entity: Entity) {
    this.checkHit(entity);
    return;
  }
}
