export const MOVE_NODE = 'MOVE_NODE';

export const moveNode = (id, x, y, mapWidth, mapHeight) => ({
  type: MOVE_NODE,
  payload: { id, x, y, mapWidth, mapHeight },
});
