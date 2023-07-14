// src/redux/reducers/nodeName.ts
import { SET_NODE_NAME } from '../actions/actionTypes';

const initialNodeNameState = {};

const nodeName = (state = initialNodeNameState, action) => {
  switch (action.type) {
    case SET_NODE_NAME:
      return {
        ...state,
        [action.payload.nodeId]: action.payload.name,
      };
    default:
      return state;
  }
};

export default nodeName;
