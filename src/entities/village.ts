import { Grid } from 'grid';
import { getState } from '../state.ts';

export const renderVillage = (grid: Grid) => {
  const village = getState().village;
  const villageElement = document.createElement('div');
  villageElement.style.backgroundColor = 'dimgray';
  villageElement.style.gridArea = `${village.y}/${village.x}/${village.y + village.height}/${
    village.x + village.width
  }`;
  grid.entityGrid.appendChild(villageElement);
  return villageElement;
};
