import { UPDATE_HANDLE_POSITION } from './actionTypes'

export const updateHandlePosition = (nodeId, handleType, position) => ({
  type: UPDATE_HANDLE_POSITION,
  nodeId,
  handleType,
  position,
});
