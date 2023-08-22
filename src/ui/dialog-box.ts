import { grid } from 'main';

export class DialogBox {
  public locationBottom = true;
  public element: HTMLDivElement;

  constructor(locationBottom?: boolean) {
    if (locationBottom !== undefined) this.locationBottom = locationBottom;
    this.element = document.createElement('div');
    this.element.style.backgroundColor = 'white';
    if (this.locationBottom) this.element.style.gridArea = '8/1/8/11';
    else this.element.style.gridArea = '1/1/1/11';
  }

  unrender() {
    this.element.remove();
  }

  showText(text: string) {
    this.unrender();
    grid.htmlGrid.appendChild(this.element);
    this.element.textContent = text;
  }
}
