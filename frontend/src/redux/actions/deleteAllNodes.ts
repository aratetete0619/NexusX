export const DELETE_ALL_NODES = 'DELETE_ALL_NODES';

export const deleteAllNodes = () => (dispatch, getState) => {
  const state = getState();
  const initialNode = state.nodes[0];
  const relatedEdges = state.edges.filter(edge => edge.from === initialNode.id || edge.to === initialNode.id);

  dispatch({
    type: DELETE_ALL_NODES,
    payload: {
      nodes: [initialNode],
      edges: relatedEdges
    }
  });

  localStorage.setItem("nodes", JSON.stringify([initialNode]));
  localStorage.setItem("edges", JSON.stringify(relatedEdges));

  dispatch(setSelectedNodeId(initialNode.id));
};
