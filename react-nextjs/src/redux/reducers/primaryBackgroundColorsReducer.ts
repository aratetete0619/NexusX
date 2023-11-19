import { UPDATE_BACKGROUND_PRIMARY_COLORS } from '../actions/actionTypes';

const DEFAULT_COLORS = ['#FF6B6B', '#FFE66D', '#06D6A0', '#118AB2', '#073B4C', '#EF476F'];
const initialState = DEFAULT_COLORS;

const primaryBackgroundColorsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_BACKGROUND_PRIMARY_COLORS:
      return action.payload.length > 0 ? action.payload : state;
    default:
      return state;
  }
};

export default primaryBackgroundColorsReducer;
