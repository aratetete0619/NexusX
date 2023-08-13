// src/redux/actions/mapSize.ts
export const SET_MAP_SIZE = 'SET_MAP_SIZE';

export const setMapSize = (width: number, height: number) => ({
  type: SET_MAP_SIZE,
  payload: { width, height },
});
