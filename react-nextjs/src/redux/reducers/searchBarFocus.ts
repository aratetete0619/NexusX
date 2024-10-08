import { SET_FOCUS } from '../actions/actionTypes'

const searchBarFocus = (state = false, action: any) => {
  switch (action.type) {
    case SET_FOCUS:
      return action.payload;
    default:
      return state;
  }
};

export default searchBarFocus;
