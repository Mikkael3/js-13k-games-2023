import { Entity } from 'entities/entity';
import { MainEntity } from 'entities/main-entity';
import { BattleMenu } from 'misc/battle-menu';

export class EnemyEntity extends Entity {
  public defeated = false;

  defeat() {
    this.defeated = true;
    this.element.remove();
  }

  render(parent: HTMLElement): void {
    if (this.defeated) return;
    super.render(parent);
  }

  handleHit(entity: MainEntity): void {
    if (this.defeated) return;
    if (this.checkHit(entity)) {
      entity.busy = true;
      entity.gridX += 1; // tahan parempi logiikka siirtaa nyt main entityn pois alta
      new BattleMenu(this, entity);
    }
  }
}
