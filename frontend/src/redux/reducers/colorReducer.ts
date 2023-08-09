// src/redux/reducers/colorReducer.ts
import { SET_COLOR, SET_BACKGROUND_COLOR } from '../actions/actionTypes';

const initialState = {
  color: '#FFFFFF',
  backgroundColor: '#FFFFFF',
};

const colorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR:
      return { ...state, color: action.payload };
    case SET_BACKGROUND_COLOR:
      return { ...state, backgroundColor: action.payload };
    default:
      return state;
  }
};

export default colorReducer;
