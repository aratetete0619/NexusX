import { ADD_POLAREDGE_INFO } from './actionTypes';

export const addPolarEdgeInfo = (startNode, endNode, relationship) => {
  return {
    type: ADD_POLAREDGE_INFO,
    payload: {
      startNode,
      endNode,
      relationship
    }
  };
};
