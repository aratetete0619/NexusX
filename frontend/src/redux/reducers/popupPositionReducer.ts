import { SET_POPUP_POSITION } from "../actions/actionTypes";

const popupPositionReducer = (state = { x: 0, y: 0 }, action: any) => {
  switch (action.type) {
    case SET_POPUP_POSITION:
      return action.payload;
    default:
      return state;
  }
};

export default popupPositionReducer;
