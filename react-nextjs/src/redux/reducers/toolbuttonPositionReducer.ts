// src/redux/reducers/toolbuttonPositionReducer.ts
import { SET_TOOLBUTTON_POSITION } from '../actions/actionTypes';

const initialState = { x: 0, y: 0 };

const toolbuttonPosition = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_TOOLBUTTON_POSITION:
      return action.payload;
    default:
      return state;
  }
};

export default toolbuttonPosition;
