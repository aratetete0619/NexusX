import { SET_POPUP_POSITION } from './actionTypes';


export const setPopupPosition = (position: { x: number, y: number }) => ({
  type: SET_POPUP_POSITION,
  payload: position,
});
