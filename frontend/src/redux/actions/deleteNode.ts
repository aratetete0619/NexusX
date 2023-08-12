export const DELETE_NODE = 'DELETE_NODE';

export const deleteNode = (nodeId: string) => ({
  type: DELETE_NODE,
  payload: nodeId,
});
