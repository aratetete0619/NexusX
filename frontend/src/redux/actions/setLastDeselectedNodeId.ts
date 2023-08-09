// src/redux/actions/setLastDeselectedNodeId.ts
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const SET_LAST_DESELECTED_NODE_ID = 'SET_LAST_DESELECTED_NODE_ID';

export interface SetLastDeselectedNodeIdAction extends Action<typeof SET_LAST_DESELECTED_NODE_ID> {
  nodeId: number | null;
}

export const setLastDeselectedNodeId = (nodeId: number | null): ThunkAction<void, {}, {}, Action<string>> => {
  return dispatch => {
    setTimeout(() => {
      dispatch({
        type: SET_LAST_DESELECTED_NODE_ID,
        nodeId,
      });
    }, 500);
  };
};
