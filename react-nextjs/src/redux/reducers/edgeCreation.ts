import { START_EDGE_CREATION, END_EDGE_CREATION } from '../actions/actionTypes';

interface StartNodeId {
  nodeId: string;
  position: string;
}

interface StartEdgeCreationAction {
  type: typeof START_EDGE_CREATION;
  payload: StartNodeId;
}

interface EndEdgeCreationAction {
  type: typeof END_EDGE_CREATION;
}

type EdgeCreationActionTypes = StartEdgeCreationAction | EndEdgeCreationAction;

export interface EdgeCreationState {
  isEdgeCreationMode: boolean;
  startNodeId: StartNodeId | null;
}


const initialState: EdgeCreationState = {
  isEdgeCreationMode: false,
  startNodeId: null,
};

const edgeCreation = (state = initialState, action: EdgeCreationActionTypes): EdgeCreationState => {
  switch (action.type) {
    case START_EDGE_CREATION:
      return {
        ...state,
        isEdgeCreationMode: true,
        startNodeId: action.payload,
      };
    case END_EDGE_CREATION:
      return {
        ...state,
        isEdgeCreationMode: false,
        startNodeId: null,
      };
    default:
      return state;
  }
};

export default edgeCreation;
