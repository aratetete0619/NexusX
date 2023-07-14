// src/redux/reducers/edges.ts
import { Edge } from '../../types/index';
import { ADD_EDGE } from '../actions/actionTypes';
import { AddEdgeAction } from '../actions/addEdge';

const initialState: Edge[] = [];

const edges = (state = initialState, action: AddEdgeAction): Edge[] => {
  switch (action.type) {
    case ADD_EDGE:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default edges;
