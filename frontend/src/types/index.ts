export type NodeData = {
  id: number;
  name: string;
  x: number;
  y: number;
  isNew?: boolean;
  parentId?: number;
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
};


export type Position = {
  x: number;
  y: number;
};
