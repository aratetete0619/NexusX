import { SET_NODE_DRAG_DIFFERENCE } from './actionTypes';

export const setNodeDragDifference = (difference: { x: number, y: number }) => ({
  type: SET_NODE_DRAG_DIFFERENCE,
  payload: difference,
});
