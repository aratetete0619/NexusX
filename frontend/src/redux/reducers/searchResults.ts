// src/redux/reducers/searchResults.ts
import { SEARCH_RESULTS } from '../actions/actionTypes';

const searchResults = (state = [], action) => {
  switch (action.type) {
    case SEARCH_RESULTS:
      console.log('Payload in reducer:', action.payload);  // ペイロードを確認するためのログ出力
      return action.payload;
    default:
      return state;  // 該当しないアクションタイプが来たときに現在のステートを返す
  }
};

export default searchResults;
