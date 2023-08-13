// src/redux/actions/addEdge.ts
import { v4 as uuidv4 } from 'uuid';
import { Edge } from '../../types/index';
import { ADD_EDGE } from './actionTypes';

export interface AddEdgeAction {
  type: typeof ADD_EDGE;
  payload: Edge;
}

export const addEdge = (fromNodeId: string, fromPosition: string, toNodeId: string, toPosition: string): AddEdgeAction => {
  const newEdge: Edge = {
    id: uuidv4(),
    source: { nodeId: fromNodeId, position: fromPosition },
    target: { nodeId: toNodeId, position: toPosition }
  };

  return {
    type: ADD_EDGE,
    payload: newEdge
  };
};
