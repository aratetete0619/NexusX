import { SET_FOCUS } from './actionTypes'

export const setFocus = (isFocused) => ({
  type: SET_FOCUS,
  payload: isFocused,
});
