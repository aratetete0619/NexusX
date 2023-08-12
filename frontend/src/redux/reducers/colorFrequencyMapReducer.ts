import { INCREMENT_COLOR_FREQUENCY } from '../actions/actionTypes';

interface IncrementColorFrequencyAction {
  type: typeof INCREMENT_COLOR_FREQUENCY;
  payload: string;
}

type ColorFrequencyState = {
  [color: string]: number;
};

const initialState: ColorFrequencyState = {};

const colorFrequencyMapReducer = (
  state = initialState,
  action: IncrementColorFrequencyAction
) => {
  switch (action.type) {
    case INCREMENT_COLOR_FREQUENCY:
      return {
        ...state,
        [action.payload]: (state[action.payload] || 0) + 1,
      };
    default:
      return state;
  }
};

export default colorFrequencyMapReducer;
