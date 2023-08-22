import { Entity } from 'entities/entity';
import { Grid } from 'grid';
import { g_entities } from '../entities.ts';
import { EnemyEntity } from './enemy-entity.ts';

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
    this.runTick().catch(console.error);
  }

  async sleep() {
    this.cooldown = true;
    await new Promise((resolve) => setTimeout(resolve, 266));
    this.cooldown = false;
  }

  initControls() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'j') {
        const y = Math.ceil(Math.random() * (this.grid.colCount - 1));
        const enemy = new EnemyEntity({
          color: 'red',
          gridX: 11,
          gridY: y,
          name: 'mongool',
          stats: {
            hp: 5,
            attack: 1,
            defence: 1,
            speed: 0,
          },
        });
        g_entities.push(enemy);
        enemy.render(this.grid.htmlGrid);
      }
    });
  }

  public timer = 0;

  checkHits() {
    this.grid.entities.forEach((e) => e.handleHit(this));
  }

  runTicks() {
    this.grid.entities.forEach((e) => e.tick());
  }

  async runTick() {
    for (;;) {
      this.timer++;
      this.timer % 10 === 0 && console.log('ticking along', this.timer);
      await this.runTicks();
      await this.sleep();
    }
  }
}
