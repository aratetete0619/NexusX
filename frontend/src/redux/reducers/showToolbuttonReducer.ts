// src/redux/reducers/showToolbuttonReducer.ts
import { SHOW_TOOLBUTTON } from '../actions/actionTypes';

const initialState = false;

const showToolbuttonReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SHOW_TOOLBUTTON:
      return action.payload;
    default:
      return state;
  }
};

export default showToolbuttonReducer;
