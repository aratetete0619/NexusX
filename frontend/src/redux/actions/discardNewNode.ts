export const DISCARD_NEW_NODE = 'DISCARD_NEW_NODE';

export const discardNewNode = (id) => (dispatch, getState) => {
  const nodes = getState().nodes;
  dispatch({
    type: DISCARD_NEW_NODE,
    payload: {
      nodes: nodes.filter(node => node.id !== id)
    }
  });
};
