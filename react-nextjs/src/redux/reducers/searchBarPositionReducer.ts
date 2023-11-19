// redux/reducers/searchBarPositionReducer.ts
import { UPDATE_SEARCH_BAR_POSITION } from '../actions/actionTypes';

const initialState = { x: 0, y: 0 };

const searchBarPositionReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_SEARCH_BAR_POSITION:
      return action.payload;
    default:
      return state;
  }
};

export default searchBarPositionReducer;
