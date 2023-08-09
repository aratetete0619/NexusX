// src/redux/actions/setResults.ts
import { SEARCH_RESULTS } from './actionTypes';

export const setResults = (results) => {
  console.log('Results in action:', results);
  return {
    type: SEARCH_RESULTS,
    payload: results,
  };
};
