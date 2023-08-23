import { Entity } from 'entities/entity';
import { grid } from 'main';
import { getEntitiesState, getUiState, updateEntitiesState, updateUiState } from 'state';

export const initControls = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'j') {
      const y = Math.ceil(Math.random() * (grid.colCount - 1));
      const enemy: Entity = {
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
      };
      updateEntitiesState([...getEntitiesState(), enemy]);
    }
    if (event.key === 'k') {
      if (!getUiState().dialog) updateUiState({ ...getUiState(), dialog: 'MORO' });
      else updateUiState({ ...getUiState(), dialog: null });
    }
  });
};
