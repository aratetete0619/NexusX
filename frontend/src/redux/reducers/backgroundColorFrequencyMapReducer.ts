// src/redux/reducers/backgroundColorFrequencyMapReducer.ts

import { INCREMENT_BACKGROUND_COLOR_FREQUENCY } from '../actions/actionTypes';

const backgroundColorFrequencyMapReducer = (state = {}, action) => {
  switch (action.type) {
    case INCREMENT_BACKGROUND_COLOR_FREQUENCY:
      return {
        ...state,
        [action.payload]: (state[action.payload] || 0) + 1
      };
    default:
      return state;
  }
};

export default backgroundColorFrequencyMapReducer;
