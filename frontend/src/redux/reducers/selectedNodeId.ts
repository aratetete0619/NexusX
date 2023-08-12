// src/redux/reducers/selectedNodeId.ts
import { SET_SELECTED_NODE_ID } from '../actions';

const selectedNodeId = (state = null, action: any) => {
  switch (action.type) {
    case SET_SELECTED_NODE_ID:
      return action.payload;
    default:
      return state;
  }
};

export default selectedNodeId;
