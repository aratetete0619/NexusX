import { SELECT_POLAR_NODE } from '../actions/actionTypes'

const initialState = null;

const selectedPolarNode = (state = initialState, action: any) => {
  switch (action.type) {
    case SELECT_POLAR_NODE:
      return action.payload;
    default:
      return state;
  }
};

export default selectedPolarNode;
