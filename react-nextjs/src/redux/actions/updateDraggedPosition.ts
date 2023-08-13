import { UPDATE_DRAGGED_POSITION } from './actionTypes';

export const updateDraggedPosition = (id: number, x: number, y: number) => ({
  type: UPDATE_DRAGGED_POSITION,
  payload: { id, x, y },
});
