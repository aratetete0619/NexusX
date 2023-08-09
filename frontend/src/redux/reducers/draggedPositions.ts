import { UPDATE_DRAGGED_POSITION } from '../actions/actionTypes';

const initialState = {};

const draggedPositions = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DRAGGED_POSITION:
      return {
        ...state,
        [action.payload.id]: { x: action.payload.x, y: action.payload.y },
      };
    default:
      return state;
  }
};

export default draggedPositions;
