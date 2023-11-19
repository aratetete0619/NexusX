import { SET_NODE_NAME } from '../actions/actionTypes';

interface SetNodeNameAction {
  type: typeof SET_NODE_NAME;
  payload: { nodeId: string; name: string };
}

type NodeNameActions = SetNodeNameAction;

const initialNodeNameState = {};

const nodeName = (state = initialNodeNameState, action: NodeNameActions) => {
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
