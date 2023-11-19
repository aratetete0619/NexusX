import { SELECT_POLAR_NODE } from './actionTypes'

export const selectPolarNode = (nodeId: number | null) => ({
  type: SELECT_POLAR_NODE,
  payload: nodeId,
});
