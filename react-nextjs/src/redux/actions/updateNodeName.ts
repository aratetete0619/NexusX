export const UPDATE_NODE_NAME = 'UPDATE_NODE_NAME';

export const updateNodeName = (nodeId: string, newName: string) => ({
  type: UPDATE_NODE_NAME,
  payload: { nodeId, newName },
});
