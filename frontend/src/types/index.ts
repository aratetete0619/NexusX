export type Node = {
  id: number;
  name: string;
  x: number;
  y: number;
  isNew?: boolean;
  parentId?: number;
};

export type Edge = {
  id: number;
  from: number;
  to: number;
  color: string;
  parentEdge?: number;
};

export type Position = {
  x: number;
  y: number;
};
