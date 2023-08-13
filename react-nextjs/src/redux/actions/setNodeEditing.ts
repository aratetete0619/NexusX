// src/redux/actions/setNodeEditing.ts
import { SET_NODE_EDITING } from './actionTypes';

const setNodeEditing = (nodeId: string, isEditing: boolean) => {
  return {
    type: SET_NODE_EDITING,
    payload: { nodeId, isEditing },
  };
};

export default setNodeEditing;
