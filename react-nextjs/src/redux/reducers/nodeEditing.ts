import { SET_NODE_EDITING } from '../actions/actionTypes';

type NodeEditingState = { [key: string]: boolean };

const initialNodeEditingState: NodeEditingState = {};

interface SetNodeEditingAction {
  type: typeof SET_NODE_EDITING;
  payload: {
    nodeId: string;
    isEditing: boolean;
  };
}

type NodeEditingActionTypes = SetNodeEditingAction;

const nodeEditing = (state = initialNodeEditingState, action: NodeEditingActionTypes): NodeEditingState => {
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
