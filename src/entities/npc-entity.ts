import { Entity, EntityProps } from 'entities/entity';
import { MainEntity } from 'entities/main-entity';

type NpcEntityProps = EntityProps & {
  texts: string[];
};

export class NpcEntity extends Entity {
  public texts: string[];
  public index = 0;
  public dialogBox: HTMLDivElement;
  public main?: MainEntity;

  constructor(props: NpcEntityProps) {
    super(props);
    this.texts = props.texts;
    this.dialogBox = document.createElement('div');
    this.dialogBox.style.backgroundColor = 'white';
    this.dialogBox.style.gridArea = '8/1/8/11';
  }

  keyHandler = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      this.index++;
      if (this.index >= this.texts.length) {
        if (this.main) this.main.busy = false;
        document.removeEventListener('keydown', this.keyHandler);
        this.dialogBox.remove();
        this.main = undefined;
        this.index = 0;
        return;
      }
      this.dialogBox.textContent = this.texts[this.index];
    }
  };

  initControls() {
    document.addEventListener('keydown', this.keyHandler);
  }

  handleHit(entity: MainEntity): void {
    if (this.checkHit(entity)) {
      if (this.texts) {
        entity.busy = true;
        entity.grid.entityGrid.appendChild(this.dialogBox);
        this.dialogBox.textContent = this.texts[this.index];
        entity.gridX += 1; // tahan parempi logiikka siirtaa nyt main entityn pois alta
        this.main = entity;
        this.initControls();
      }
    }
  }
}
