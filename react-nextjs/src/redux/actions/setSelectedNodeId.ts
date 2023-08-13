export const SET_SELECTED_NODE_ID = 'SET_SELECTED_NODE_ID';

export const setSelectedNodeId = (nodeId: string | null) => ({
  type: SET_SELECTED_NODE_ID,
  payload: nodeId,
});
