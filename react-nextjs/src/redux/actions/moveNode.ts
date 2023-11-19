export const MOVE_NODE = 'MOVE_NODE';

export const moveNode = (id: string, x: number, y: number, mapWidth: number, mapHeight: number) => ({
  type: MOVE_NODE,
  payload: { id, x, y, mapWidth, mapHeight },
});
