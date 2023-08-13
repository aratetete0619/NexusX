import { INCREMENT_BACKGROUND_COLOR_FREQUENCY } from '../actions/actionTypes';

type Action = {
  type: typeof INCREMENT_BACKGROUND_COLOR_FREQUENCY;
  payload: string;
};

type State = Record<string, number>;

const initialState: State = {};

const backgroundColorFrequencyMapReducer = (state = initialState, action: Action): State => {
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
