// src/redux/reducers/searchResults.ts
import { SEARCH_RESULTS } from '../actions/actionTypes';

const searchResults = (state = [], action: any) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      console.log('Payload in reducer:', action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default searchResults;
