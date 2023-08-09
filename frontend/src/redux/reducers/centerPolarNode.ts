import { CENTER_POLAR_NODE } from '../actions/actionTypes'

const initialState = null;

const centerPolarNode = (state = initialState, action) => {
  switch (action.type) {
    case CENTER_POLAR_NODE:
      return action.payload;
    default:
      return state;
  }
};

export default centerPolarNode;
