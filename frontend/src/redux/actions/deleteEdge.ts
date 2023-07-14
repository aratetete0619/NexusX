export const DELETE_EDGE = 'DELETE_EDGE';

export const deleteEdge = (edgeId) => ({
  type: DELETE_EDGE,
  payload: edgeId,
});
