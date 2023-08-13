import { CENTER_POLAR_NODE } from '../actions/actionTypes';
import { Neo4jData } from '../../types/index';

type State = Neo4jData | null;

interface SetCenterPolarNodeAction {
  type: typeof CENTER_POLAR_NODE;
  payload: Neo4jData;
}

type Action = SetCenterPolarNodeAction;

const initialState: State = null;

const centerPolarNode = (state = initialState, action: Action): State => {
  switch (action.type) {
    case CENTER_POLAR_NODE:
      return action.payload;
    default:
      return state;
  }
};

export default centerPolarNode;
