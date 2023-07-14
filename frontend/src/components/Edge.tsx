import React, { useEffect } from 'react';
import '../styles/Edge.css';
import { NODE_WIDTH, NODE_HEIGHT } from '../constants/constants';
import { Node } from '../types/index'

interface EdgeProps {
  fromNode: Node;
  toNode: Node;
  color: string;
  parentEdge?: {
    fromNode: Node;
    toNode: Node;
  };
}
const Edge: React.FC<EdgeProps> = ({ fromNode, toNode, color, parentEdge }) => {
  console.log('Edge color:', color);
  if (!fromNode || !toNode) {
    // If either of the nodes are not found, don't draw the edge
    return null;
  }

  // Calculate the points where the edge should start and end, in the center of each node
  const fromPoint = parentEdge
    ? { x: (parentEdge.fromNode.x + parentEdge.toNode.x) / 2, y: (parentEdge.fromNode.y + parentEdge.toNode.y) / 2 }
    : { x: fromNode.x + NODE_WIDTH / 2, y: fromNode.y + NODE_HEIGHT / 2 };
  const toPoint = { x: toNode.x + NODE_WIDTH / 2, y: toNode.y + NODE_HEIGHT / 2 };

  // Calculate the control point for the quadratic Bezier curve
  const controlPoint = {
    x: (fromPoint.x + toPoint.x) / 2,
    y: (fromPoint.y + toPoint.y) / 2,
  };

  // Draw a quadratic Bezier curve from the 'from' node to the 'to' node
  const pathString = `M ${fromPoint.x} ${fromPoint.y} Q ${controlPoint.x} ${controlPoint.y}, ${toPoint.x} ${toPoint.y}`;

  const minX = Math.min(fromPoint.x, toPoint.x);
  const minY = Math.min(fromPoint.y, toPoint.y);
  const width = Math.abs(fromPoint.x - toPoint.x);
  const height = Math.abs(fromPoint.y - toPoint.y);




  return (
    <div className="edge-container">
      <svg viewBox={`${minX} ${minY} ${width} ${height}`}>
        <path
          d={pathString}
          stroke={color}
          fill="transparent"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

}

export default Edge;
