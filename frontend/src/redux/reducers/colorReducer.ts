import { SET_COLOR, SET_BACKGROUND_COLOR } from '../actions/actionTypes';

interface ColorState {
  color: string;
  backgroundColor: string;
}

const initialState: ColorState = {
  color: '#FFFFFF',
  backgroundColor: '#FFFFFF',
};

interface SetColorAction {
  type: typeof SET_COLOR;
  payload: string;
}

interface SetBackgroundColorAction {
  type: typeof SET_BACKGROUND_COLOR;
  payload: string;
}

type ColorActionTypes = SetColorAction | SetBackgroundColorAction;

const colorReducer = (state = initialState, action: ColorActionTypes): ColorState => {
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
