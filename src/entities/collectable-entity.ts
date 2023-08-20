import { Entity } from 'entities/entity';
import { MainEntity } from 'entities/main-entity';
import { DialogBox } from 'ui/dialog-box';

export class CollectableEntity extends Entity {
  public collected = false;
  public dialogBox?: DialogBox;
  public main?: MainEntity;

  render(parent: HTMLElement): void {
    if (this.collected) return;
    super.render(parent);
  }

  keyHandler = (event: KeyboardEvent) => {
    if (event.key === ' ') {
      this.dialogBox?.unrender();
      if (this.main) this.main.busy = false;
      document.removeEventListener('keydown', this.keyHandler);
      this.main = undefined;
    }
  };

  initControls() {
    document.addEventListener('keydown', this.keyHandler);
  }

  handleHit(entity: MainEntity): void {
    if (this.collected) return;
    if (this.checkHit(entity)) {
      this.main = entity;
      this.collected = true;
      this.element.remove();
      entity.inventory.push(this.name);
      this.dialogBox = new DialogBox(entity.gridY !== 8);
      this.dialogBox.showText(`You found the ${this.name}`);
      this.main.busy = true;
      this.initControls();
    }
  }
}
