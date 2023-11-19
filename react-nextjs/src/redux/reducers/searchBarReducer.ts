import { UPDATE_QUERY } from '../actions/actionTypes';

const initialState = {
  query: ''
};

const searchBarReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default searchBarReducer;
