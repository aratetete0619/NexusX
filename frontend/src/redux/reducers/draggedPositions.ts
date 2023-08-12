import { UPDATE_DRAGGED_POSITION } from '../actions/actionTypes';

interface DraggedPositionsState {
  [id: number]: {
    x: number;
    y: number;
  };
}

const initialState: DraggedPositionsState = {};

interface UpdateDraggedPositionAction {
  type: typeof UPDATE_DRAGGED_POSITION;
  payload: {
    id: number;
    x: number;
    y: number;
  };
}

type DraggedPositionsActionTypes = UpdateDraggedPositionAction;

const draggedPositions = (state: DraggedPositionsState = initialState, action: DraggedPositionsActionTypes): DraggedPositionsState => {
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
