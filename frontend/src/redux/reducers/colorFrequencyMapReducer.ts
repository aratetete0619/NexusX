// src/redux/reducers/colorFrequencyMapReducer.ts

import { INCREMENT_COLOR_FREQUENCY } from '../actions/actionTypes';

const colorFrequencyMapReducer = (state = {}, action) => {
  switch (action.type) {
    case INCREMENT_COLOR_FREQUENCY:
      return {
        ...state,
        [action.payload]: (state[action.payload] || 0) + 1
      };
    default:
      return state;
  }
};

export default colorFrequencyMapReducer;
