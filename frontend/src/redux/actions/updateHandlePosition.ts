import { UPDATE_HANDLE_POSITION } from './actionTypes'

type Position = {
  x: number;
  y: number;
};

export const updateHandlePosition = (nodeId: string, handleType: string, position: Position) => ({
  type: UPDATE_HANDLE_POSITION,
  nodeId,
  handleType,
  position,
});
