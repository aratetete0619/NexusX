// src/redux/reducers/showPickerReducer.ts
import { SHOW_PICKER, HIDE_PICKER, TOGGLE_PICKER } from '../actions/actionTypes';

const initialState = {
  color: false,
  background: false,
};

const showPickerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_PICKER:
      return { ...state, [action.payload]: true };
    case HIDE_PICKER:
      return { ...state, [action.payload]: false };
    case TOGGLE_PICKER:
      return { ...state, [action.payload]: !state[action.payload] };
    default:
      return state;
  }
};

export default showPickerReducer;
