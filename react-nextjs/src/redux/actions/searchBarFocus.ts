import { SET_FOCUS } from './actionTypes'

export const setFocus = (isFocused: boolean) => ({
  type: SET_FOCUS,
  payload: isFocused,
});
