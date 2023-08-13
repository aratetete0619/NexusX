import { SET_NODE_DRAG_DIFFERENCE } from '../actions/actionTypes';

type NodeDragDifferenceState = {
  x: number;
  y: number;
};

const initialState: NodeDragDifferenceState = { x: 0, y: 0 };

interface SetNodeDragDifferenceAction {
  type: typeof SET_NODE_DRAG_DIFFERENCE;
  payload: NodeDragDifferenceState;
}

type NodeDragDifferenceActionTypes = SetNodeDragDifferenceAction;

const nodeDragDifference = (state = initialState, action: NodeDragDifferenceActionTypes): NodeDragDifferenceState => {
  switch (action.type) {
    case SET_NODE_DRAG_DIFFERENCE:
      return action.payload;
    default:
      return state;
  }
};

export default nodeDragDifference;
