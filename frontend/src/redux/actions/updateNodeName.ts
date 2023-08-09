export const UPDATE_NODE_NAME = 'UPDATE_NODE_NAME';

export const updateNodeName = (nodeId, newName) => ({
  type: UPDATE_NODE_NAME,
  payload: { nodeId, newName },
});
