// src/redux/reducers/map.ts
import { MOVE_NODE, SET_MAP_SIZE } from '../actions/';
import { UPDATE_SEARCH_BAR_POSITION } from '../actions/actionTypes';

type MapActionTypes =
  | { type: typeof MOVE_NODE; payload: { id: string; x: number; y: number; mapWidth: number; mapHeight: number; } }
  | { type: typeof UPDATE_SEARCH_BAR_POSITION; payload: { x: number; y: number; } }
  | { type: typeof SET_MAP_SIZE; payload: { width: number; height: number; } };


const initialMapState = {
  width: 10000,
  height: 10000,
};

const map = (state = initialMapState, action: MapActionTypes) => {
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
