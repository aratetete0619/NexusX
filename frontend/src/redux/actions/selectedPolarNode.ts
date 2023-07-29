import { SELECT_POLAR_NODE } from './actionTypes'

export const selectPolarNode = (nodeId) => ({
  type: SELECT_POLAR_NODE,
  payload: nodeId,
});
