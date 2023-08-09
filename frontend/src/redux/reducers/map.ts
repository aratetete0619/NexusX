// src/redux/reducers/map.ts
import { MOVE_NODE, SET_MAP_SIZE, UPDATE_SEARCH_BAR_POSITION } from '../actions';

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
    case UPDATE_SEARCH_BAR_POSITION:
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
