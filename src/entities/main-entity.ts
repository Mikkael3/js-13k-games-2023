import { Demon } from 'entities/demon-entity';
import { Entity } from 'entities/entity';
import { Grid } from 'grid';

export class MainEntity extends Entity {
  public grid: Grid;
  public inventory: string[] = [];
  public party: Demon[] = [];
  public rendered: boolean = true;
  public busy = false;
  public cooldown = false;

  constructor(grid: Grid) {
    super({
      mapX: 0,
      mapY: 0,
      color: 'black',
      name: 'Hero',
      gridY: 5,
      gridX: 5,
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
        if (this.gridY === 8) {
          if (this.grid.moveMapY(1)) {
            this.gridY = 1;
            this.sleep();
            return;
          } else return;
        }
        this.gridY += 1;
        this.sleep();
      }

      if (event.key === 'ArrowUp') {
        if (this.gridY === 1) {
          if (this.grid.moveMapY(-1)) {
            this.gridY = 8;
            this.sleep();
          }
        } else {
          this.gridY -= 1;
          this.sleep();
        }
      }
      if (event.key === 'ArrowLeft') {
        if (this.gridX === 1) {
          if (this.grid.moveMapX(-1)) {
            this.gridX = 10;
            this.sleep();
          }
        } else this.gridX -= 1;
        this.sleep();
      }
      if (event.key === 'ArrowRight') {
        if (this.gridX === 10) {
          if (this.grid.moveMapX(1)) {
            this.gridX = 1;
            this.sleep();
          }
        } else {
          this.gridX += 1;
          this.sleep();
        }
      }

      if (event.key === ' ') {
        console.log('status', this.inventory);
      }
      this.checkHits();
    });
  }
}
