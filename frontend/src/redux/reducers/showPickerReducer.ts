// src/redux/reducers/showPickerReducer.ts
import { SHOW_PICKER, HIDE_PICKER, TOGGLE_PICKER } from '../actions/actionTypes';

const initialState = {
  color: false,
  background: false,
};

type ShowPickerAction = {
  type: typeof SHOW_PICKER | typeof HIDE_PICKER | typeof TOGGLE_PICKER;
  payload: 'color' | 'background';
};

const showPickerReducer = (state = initialState, action: ShowPickerAction) => {
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
