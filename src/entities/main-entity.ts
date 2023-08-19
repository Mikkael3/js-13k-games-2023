import { Entity } from 'entities/entity';
import { Grid } from 'grid';

export class MainEntity extends Entity {
  public grid: Grid;
  public inventory: string[] = [];
  public rendered: boolean = true;
  public busy = false;
  public cooldown = false;

  constructor(grid: Grid) {
    super({
      color: 'black',
      name: 'Hero',
      gridY: 13,
      gridX: 16,
    });

    this.grid = grid;

    this.initControls();

    this.stats = {
      hp: 1,
      attack: 1,
      defence: 1,
      speed: 1,
    };
  }

  checkHits() {
    this.grid.entities.forEach((e) => e.handleHit(this));
  }

  async sleep() {
    this.cooldown = true;
    await new Promise((resolve) => setTimeout(resolve, 66));
    this.cooldown = false;
  }

  initControls() {
    document.addEventListener('keydown', (event) => {
      if (this.busy || this.cooldown) return;
      if (event.key === 'ArrowDown') {
        this.gridY += 1;
        this.sleep();
      }

      if (event.key === 'ArrowUp') {
        this.gridY -= 1;
        this.sleep();
      }
      if (event.key === 'ArrowLeft') {
        this.gridX -= 1;
        this.sleep();
      }
      if (event.key === 'ArrowRight') {
        this.gridX += 1;
        this.sleep();
      }

      if (event.key === ' ') {
        console.log('status', this.inventory);
      }
      this.checkHits();
    });
  }
}
