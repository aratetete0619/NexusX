// showToolbuttonAction.ts
import { SHOW_TOOLBUTTON } from './actionTypes';

export const showToolbuttonAction = (isVisible: boolean) => {
  return {
    type: SHOW_TOOLBUTTON,
    payload: isVisible,
  };
};
