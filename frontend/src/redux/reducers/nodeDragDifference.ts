import { SET_NODE_DRAG_DIFFERENCE } from '../actions/actionTypes';

const initialState = { x: 0, y: 0 };

const nodeDragDifference = (state = initialState, action) => {
  switch (action.type) {
    case SET_NODE_DRAG_DIFFERENCE:
      return action.payload;
    default:
      return state;
  }
};

export default nodeDragDifference;
