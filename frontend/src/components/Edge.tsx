import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';

interface EdgeProps { }

const Edge: React.FC<EdgeProps> = () => {
  const svgRef = useRef(null);
  const edges = useSelector((state) => state.edges);
  const nodes = useSelector((state) => state.nodes);

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

      // Direction vector from source to target
      const dirX = targetX - sourceX;
      const dirY = targetY - sourceY;

      // Length of the direction vector (distance between source and target)
      const length = Math.sqrt(dirX * dirX + dirY * dirY);

      // Length of the new segment to be subtracted from the ends of the edge
      const offsetLength = 85.5; // For example, subtract 85.5px from each end

      // Compute the new source and target points
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
      svg.selectAll("*").remove(); // Clear the contents of the SVG
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
