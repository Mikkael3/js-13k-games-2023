export type Stats = {
  hp: number;
  attack: number;
  defence: number;
  speed: number;
};

export type Entity = {
  gridY: number;
  gridX: number;
  color: string;
  name?: string;
  stats?: Stats;
};

export const renderEntity = (entity: Entity, parent: HTMLDivElement) => {
  const element = document.createElement('div');
  element.style.backgroundColor = entity.color;
  element.style.gridArea = `${entity.gridY}/${entity.gridX}`;
  element.style.width = '30px';
  element.style.height = '30px';
  element.style.justifySelf = 'center';
  element.style.alignSelf = 'center';
  parent.appendChild(element);
};
