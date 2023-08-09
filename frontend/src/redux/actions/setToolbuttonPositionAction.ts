// setToolbuttonPositionAction.ts
import { SET_TOOLBUTTON_POSITION } from './actionTypes';

export const setToolbuttonPositionAction = (position: { x: number; y: number }) => {
  return {
    type: SET_TOOLBUTTON_POSITION,
    payload: position,
  };
};
