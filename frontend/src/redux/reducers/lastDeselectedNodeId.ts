// src/redux/reducers/lastDeselectedNodeId.ts
import { SET_LAST_DESELECTED_NODE_ID } from '../actions';

const lastDeselectedNodeId = (state = null, action) => {
  switch (action.type) {
    case SET_LAST_DESELECTED_NODE_ID:
      return action.nodeId
    default:
      return state;
  }
};

export default lastDeselectedNodeId;
