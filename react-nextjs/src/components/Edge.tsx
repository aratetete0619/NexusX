import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import { RootState } from '../redux/reducers';
import { Node as NodeType } from '../types/index';

interface EdgeProps {
  fromNode: NodeType;
  toNode: NodeType;
  color?: string;
}

const Edge: React.FC<EdgeProps> = () => {
  const svgRef = useRef(null);
  const edges = useSelector((state: RootState) => state.edges);
  const nodes = useSelector((state: RootState) => state.nodes);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    edges.forEach((edge) => {
      const sourceNode = nodes.find(node => node.id === edge.source.nodeId);
      const targetNode = nodes.find(node => node.id === edge.target.nodeId);

      if (!sourceNode || !targetNode) return;

      const sourceX = sourceNode.x + 85.5;
      const sourceY = sourceNode.y + 85.5;
      const targetX = targetNode.x + 85.5;
      const targetY = targetNode.y + 85.5;

      const dirX = targetX - sourceX;
      const dirY = targetY - sourceY;

      const length = Math.sqrt(dirX * dirX + dirY * dirY);

      const offsetLength = 85.5;

      const newSourceX = sourceX + offsetLength * dirX / length;
      const newSourceY = sourceY + offsetLength * dirY / length;
      const newTargetX = targetX - offsetLength * dirX / length;
      const newTargetY = targetY - offsetLength * dirY / length;

      svg.append("line")
        .attr("x1", newSourceX)
        .attr("y1", newSourceY)
        .attr("x2", newTargetX)
        .attr("y2", newTargetY)
        .attr("stroke", "black")
        .attr("stroke-width", 2);
    });

    return () => {
      svg.selectAll("*").remove();
    };
  }, [edges, nodes]);

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -10,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default Edge;
