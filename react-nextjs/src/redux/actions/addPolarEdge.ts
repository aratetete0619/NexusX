import { ADD_POLAREDGE_INFO } from './actionTypes';

type Node = {
  __typename: string;
  identity: string;
  labels: string[];
  properties: {
    __typename: string;
    name: string;
    esId: string;
    imagePath: string | null;
    description: string;
  };
};

type Relationship = {
  __typename: string;
  identity: string;
  type: string;
  properties: {
    __typename: string;
    name: string | null;
    esId: string | null;
    imagePath: string | null;
    description: string | null;
  };
};



export const addPolarEdgeInfo = (startNode: Node, endNode: Node, relationship: Relationship) => {
  return {
    type: ADD_POLAREDGE_INFO,
    payload: {
      startNode,
      endNode,
      relationship
    }
  };
};
