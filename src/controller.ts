import { EnemyEntity } from 'entities/enemy-entity';

import { grid } from 'main';
import { getEnemiesState, getUiState, updateEnemiesState, updateUiState } from 'state';

export const initControls = () => {
  document.addEventListener('keydown', (event) => {
    if (event.key === 'j') {
      const y = Math.ceil(Math.random() * (grid.colCount - 1));
      const enemy: EnemyEntity = {
        color: 'red',
        gridX: 11,
        gridY: y,
        name: 'enemy',
        stats: {
          hp: 5,
          attack: 1,
          defence: 1,
          speed: 0,
        },
      };
      updateEnemiesState([...getEnemiesState(), enemy]);
    }
    if (event.key === 'k') {
      if (!getUiState().dialog) updateUiState({ ...getUiState(), dialog: 'MORO' });
      else updateUiState({ ...getUiState(), dialog: null });
    }
  });
};
