// src/redux/actions/addEdge.ts
import { Edge } from '../../types/index';
import { ADD_EDGE } from './actionTypes';

export interface AddEdgeAction {
  type: typeof ADD_EDGE;
  payload: Edge;
}

export const addEdge = (edge: Edge): AddEdgeAction => ({
  type: ADD_EDGE,
  payload: edge,
});
