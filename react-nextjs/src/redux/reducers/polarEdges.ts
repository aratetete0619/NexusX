import { ADD_POLAREDGE_INFO, CLEAR_POLAREDGE_INFO } from '../actions/actionTypes';
import { Node, Relationship } from '../../types/index'

type PolarEdge = {
  startNode: Node;
  endNode: Node;
  relationship: Relationship;
};

const initialState: PolarEdge[] = [];

const polarEdgesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_POLAREDGE_INFO:
      return [...state, action.payload];
    case CLEAR_POLAREDGE_INFO:
      return [];
    default:
      return state;
  }
};

export default polarEdgesReducer;
