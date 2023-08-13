import { Node, Position } from '../types/index';

export const calculateEdgeCenter = (fromNode: Node, toNode: Node): Position => {
  const center = {
    x: (fromNode.x + toNode.x) / 2,
    y: (fromNode.y + toNode.y) / 2,
  };
  return center;
};

export const calculateSiblingNodePosition = (edgeCenter: Position, selectedNode: Node): Position => {
  const offset = 50; // you can adjust this value to get the preferred distance
  const position = {
    x: edgeCenter.x + ((selectedNode.x - edgeCenter.x) / 2) + offset,
    y: edgeCenter.y + ((selectedNode.y - edgeCenter.y) / 2) + offset,
  };
  return position;
};
