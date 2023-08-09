import { ADD_POLAREDGE_INFO, CLEAR_POLAREDGE_INFO } from '../actions/actionTypes';

const initialState = [];

const polarEdgesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POLAREDGE_INFO:
      return [...state, action.payload];
    case CLEAR_POLAREDGE_INFO:
      return [];
    default:
      return state;
  }
};

export default polarEdgesReducer;
