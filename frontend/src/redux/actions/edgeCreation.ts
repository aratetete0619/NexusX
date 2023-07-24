import { START_EDGE_CREATION, END_EDGE_CREATION } from './actionTypes';

export function startEdgeCreation(nodeId: string, position: string) {
  return {
    type: START_EDGE_CREATION,
    payload: { nodeId, position },
  };
}

export function endEdgeCreation() {
  return {
    type: END_EDGE_CREATION,
  };
}
