// src/redux/reducers/lastDeselectedNodeId.ts
import { SET_LAST_DESELECTED_NODE_ID } from '../actions/actionTypes';
import { SetLastDeselectedNodeIdAction } from '../actions/setLastDeselectedNodeId';


type LastDeselectedNodeIdState = number | null;

const lastDeselectedNodeId = (
  state: LastDeselectedNodeIdState = null,
  action: SetLastDeselectedNodeIdAction
): LastDeselectedNodeIdState => {
  switch (action.type) {
    case SET_LAST_DESELECTED_NODE_ID:
      return action.nodeId;
    default:
      return state;
  }
};

export default lastDeselectedNodeId;
