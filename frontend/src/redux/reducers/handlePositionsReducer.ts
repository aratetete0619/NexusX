import { UPDATE_HANDLE_POSITION } from '../actions/actionTypes'

const initialHandlePositionsState = {};

// 新しいリデューサーを作成
const handlePositions = (state = initialHandlePositionsState, action) => {
  switch (action.type) {
    case UPDATE_HANDLE_POSITION:
      return {
        ...state,
        [`${action.nodeId}_${action.handleType}`]: action.position,
      };
    default:
      return state;
  }
};

export default handlePositions
