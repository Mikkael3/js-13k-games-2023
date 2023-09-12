import { Grid } from 'grid';
import { resetState } from 'state';

export const renderEndScreen = (grid: Grid) => {
  grid.uiHtmlGrid.innerHTML = '';
  const menuHtmlContainer = document.createElement('div');
  menuHtmlContainer.style.backgroundColor = 'white';
  menuHtmlContainer.style.gridArea = `1/1/28/49`;
  menuHtmlContainer.style.display = 'grid';
  menuHtmlContainer.style.gridTemplateColumns = `repeat(${1}, 1fr)`;
  menuHtmlContainer.style.gridTemplateRows = `repeat(${6},1fr)`;
  grid.uiHtmlGrid.appendChild(menuHtmlContainer);
  const button = document.createElement('button');
  button.textContent = 'Start a new game click here';
  menuHtmlContainer.appendChild(button);
  button.onclick = resetState;
};
