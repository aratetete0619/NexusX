// src/redux/actions/setNodeName.ts
import { SET_NODE_NAME } from './actionTypes';

const setNodeName = (nodeId: string, name: string) => {
  return {
    type: SET_NODE_NAME,
    payload: { nodeId, name },
  };
};

export default setNodeName;
