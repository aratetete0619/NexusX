// src/redux/actions/setResults.ts
import { SEARCH_RESULTS } from './actionTypes';

export const setResults = (results) => {
  console.log('Results in action:', results);  // 結果を確認するためのログ出力
  return {
    type: SEARCH_RESULTS,
    payload: results,
  };
};
