
export const ADD_NODE = 'ADD_NODE';

export const addNode = (node: any) => {
  return {
    type: ADD_NODE,
    payload: {
      ...node,
      isNew: true,
    },
  };
};
