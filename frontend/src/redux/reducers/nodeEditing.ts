// src/redux/reducers/nodeEditing.ts
import { SET_NODE_EDITING } from '../actions/actionTypes';

const initialNodeEditingState = {};

const nodeEditing = (state = initialNodeEditingState, action) => {
  switch (action.type) {
    case SET_NODE_EDITING:
      return {
        ...state,
        [action.payload.nodeId]: action.payload.isEditing,
      };
    default:
      return state;
  }
};

export default nodeEditing;
