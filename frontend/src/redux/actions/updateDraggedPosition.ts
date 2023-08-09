import { UPDATE_DRAGGED_POSITION } from './actionTypes';

export const updateDraggedPosition = (id, x, y) => ({
  type: UPDATE_DRAGGED_POSITION,
  payload: { id, x, y },
});
