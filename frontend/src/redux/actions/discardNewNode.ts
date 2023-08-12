import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';

export const DISCARD_NEW_NODE = 'DISCARD_NEW_NODE';

export const discardNewNode = (id: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch: ThunkDispatch<RootState, unknown, AnyAction>, getState) => {
    const nodes = getState().nodes;
    dispatch({
      type: DISCARD_NEW_NODE,
      payload: {
        nodes: nodes.filter(node => node.id !== id)
      }
    });
  };
