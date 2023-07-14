// src/redux/reducers/map.ts
import { MOVE_NODE, SET_MAP_SIZE } from '../actions';

const initialMapState = {
  width: 10000,
  height: 10000,
};

const map = (state = initialMapState, action) => {
  switch (action.type) {
    case MOVE_NODE:
      return {
        ...state,
        width: Math.max(state.width, action.payload.mapWidth),
        height: Math.max(state.height, action.payload.mapHeight),
      };
    case SET_MAP_SIZE:
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
      };
    default:
      return state;
  }
};

export default map;
