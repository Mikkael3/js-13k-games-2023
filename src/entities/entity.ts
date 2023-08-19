export type Stats = {
  hp: number;
  attack: number;
  defence: number;
  speed: number;
};

export type EntityProps = {
  gridY: number;
  gridX: number;
  color: string;
  name?: string;
  stats?: Stats;
};

export class Entity {
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

  render(parent: HTMLElement) {
    parent.appendChild(this.element);
    this.rendered = true;
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
