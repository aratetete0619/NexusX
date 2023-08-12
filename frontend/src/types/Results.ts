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
  score: null;
};
