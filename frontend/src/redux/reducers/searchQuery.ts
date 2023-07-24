// src/redux/reducers/searchQuery.ts
import { UPDATE_SEARCH_QUERY } from '../actions/actionTypes';

const initialState = '';

const searchQueryReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_QUERY:
      return action.payload;
    default:
      return state;
  }
};

export default searchQueryReducer;
