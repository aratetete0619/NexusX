import { UPDATE_HANDLE_POSITION } from '../actions/actionTypes';

const initialHandlePositionsState = {};

interface UpdateHandlePositionAction {
  type: typeof UPDATE_HANDLE_POSITION;
  nodeId: string;
  handleType: string;
  position: { x: number; y: number };
}

type HandlePositionsActionTypes = UpdateHandlePositionAction;

const handlePositions = (state = initialHandlePositionsState, action: HandlePositionsActionTypes) => {
  switch (action.type) {
    case UPDATE_HANDLE_POSITION:
      return {
        ...state,
        [`${action.nodeId}_${action.handleType}`]: action.position,
      };
    default:
      return state;
  }
};

export default handlePositions;
