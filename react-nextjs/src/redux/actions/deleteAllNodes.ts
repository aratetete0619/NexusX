export const DELETE_ALL_NODES = 'DELETE_ALL_NODES';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';
import { AnyAction } from 'redux';
import { setSelectedNodeId } from './setSelectedNodeId';

export const deleteAllNodes = (): ThunkAction<void, RootState, null, AnyAction> =>
  (dispatch: ThunkDispatch<RootState, null, AnyAction>, getState) => {
    const state = getState();
    const initialNode = state.nodes[0];
    const relatedEdges = state.edges.filter(edge => edge.source.nodeId === initialNode.id || edge.target.nodeId === initialNode.id);

    dispatch({
      type: DELETE_ALL_NODES,
      payload: {
        nodes: [initialNode],
        edges: relatedEdges
      }
    });

    localStorage.setItem("nodes", JSON.stringify([initialNode]));
    localStorage.setItem("edges", JSON.stringify(relatedEdges));

    dispatch(setSelectedNodeId(initialNode.id));
  };
