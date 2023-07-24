import { START_EDGE_CREATION, END_EDGE_CREATION } from '../actions/actionTypes';

const initialState = {
  isEdgeCreationMode: false,
  startNode: null, // startNodeとして名前を変更し、ノードIDだけでなくハンドルの位置も管理する
};

const edgeCreation = (state = initialState, action) => {
  switch (action.type) {
    case START_EDGE_CREATION:
      return {
        ...state,
        isEdgeCreationMode: true,
        startNodeId: action.payload,  // ドラッグ開始したハンドルのノードIDと位置を保存する
      };
    case END_EDGE_CREATION:
      return {
        ...state,
        isEdgeCreationMode: false,
        startNodeId: null,  // ハンドルの位置情報もnullにする
      };
    default:
      return state;
  }
};

export default edgeCreation;
