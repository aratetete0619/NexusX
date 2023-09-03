export type Node = {
  id: string;
  name: string;
  x: number;
  y: number;
  left: number;
  top: number;
  color?: string;
  backgroundColor?: string;
  isNew?: boolean;
  parentId?: number;
  label?: string;
  description?: string;
};

export type Edge = {
  id: string;
  source: {
    nodeId: string;
    position: string;
  };
  target: {
    nodeId: string;
    position: string;
  };
  color?: string;
};

export type Position = {
  x: number;
  y: number;
};

export type Properties = {
  __typename: string;
  name: string;
  esId: string;
  imagePath: string;
  description: string;
};

export type Neo4jData = {
  __typename: string;
  identity: string;
  labels: string[];
  properties: Properties;
};

export type ResultType = {
  __typename: string;
  originalQuery: string;
  preprocessedQuery: string;
  startNode: Neo4jData;
  properties?: Properties;
  score: null;
};

export type RelationshipProperties = {
  __typename: 'RelationshipProperties';
  name: string | null;
  esId: string | null;
  imagePath: string | null;
  description: string | null;
};

export type Relationship = {
  __typename: 'Relationship';
  identity: string;
  type: string;
  properties: RelationshipProperties;
};
