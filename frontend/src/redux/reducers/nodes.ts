// src/redux/reducers/nodes.ts
import {
  ADD_NODE,
  DELETE_NODE,
  UPDATE_NODE_NAME,
  MOVE_NODE,
  DELETE_ALL_NODES,
  DISCARD_NEW_NODE
} from '../actions';

const initialNodesState = [{
  id: '1',
  name: 'Initial Node',
  x: 500,
  y: 500,
  isNew: false
}];

const nodes = (state = initialNodesState, action) => {
  switch (action.type) {
    case ADD_NODE:
      return [...state, action.payload];
    case DELETE_NODE:
      return state.filter(node => node.id !== action.payload);
    case UPDATE_NODE_NAME:
      return state.map(node =>
        node.id === action.payload.nodeId ? { ...node, name: action.payload.newName } : node
      );
    case MOVE_NODE:
      return state.map(node =>
        node.id === action.payload.id
          ? { ...node, x: action.payload.x, y: action.payload.y }
          : node
      );
    case DELETE_ALL_NODES:
      return [];
    case DISCARD_NEW_NODE:
      // Assuming we need to mark a node as no longer new
      return state.map(node =>
        node.id === action.payload ? { ...node, isNew: false } : node
      );
    default:
      return state;
  }
};

export default nodes;
