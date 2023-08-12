import React, { useRef, useEffect } from 'react';
import { RootState } from '../redux/reducers';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import styles from '../styles/PolarNodeEdge.module.css'

interface GradientStop {
  offset: string;
  color: string;
}

const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let charCode = str.charCodeAt(i);
    if (str.charAt(i) === "_") {
      charCode = 95;
    }
    hash = charCode + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const PolarNodeEdge: React.FC = () => {
  const svgRef = useRef(null);
  const draggedPositions = useSelector((state: RootState) => state.draggedPositions);
  const results = useSelector((state: RootState) => state.searchResults);
  const centerPosition = useSelector((state: RootState) => state.searchBarPosition);
  const polarEdges = useSelector((state: RootState) => state.polarEdges);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const startNodePosition = centerPosition;
    if (!startNodePosition) return;

    const adjustedStartNodeX = startNodePosition.x + 900;
    const adjustedStartNodeY = startNodePosition.y;

    const tooltipDiv = d3.select("body").append("div")
      .attr("class", styles.tooltip)
      .style("opacity", 0);

    d3.select("body").on("click", function () {
      tooltipDiv.transition()
        .duration(500)
        .style("opacity", 0);
    });


    results.forEach((_: any, i: number) => {
      const endNodePosition = draggedPositions[i];
      if (!endNodePosition) return;

      const adjustedEndNodeX = endNodePosition.x + 250;
      const adjustedEndNodeY = endNodePosition.y + 100;
      const edgeType = polarEdges[i]?.relationship.type;
      console.log(edgeType)
      const edgeColor = edgeType ? stringToColor(edgeType) : "rgba(0, 0, 0, 0.2)";

      const dirX = adjustedEndNodeX - adjustedStartNodeX;
      const dirY = adjustedEndNodeY - adjustedStartNodeY;

      const length = Math.sqrt(dirX * dirX + dirY * dirY);

      const scaleFactor = 0.9;
      const newLength = length * scaleFactor;

      const scaledDirX = dirX * (newLength / length);
      const scaledDirY = dirY * (newLength / length);

      const newEndX = adjustedStartNodeX + scaledDirX;
      const newEndY = adjustedStartNodeY + scaledDirY;

      const gradientId = `gradient${i}`;

      svg.append("defs")
        .append("linearGradient")
        .attr("id", gradientId)
        .selectAll("stop")
        .data([
          { offset: "0%", color: "white" },
          { offset: "100%", color: edgeColor }
        ])
        .enter()
        .append("stop")
        .attr("offset", (d: GradientStop) => d.offset)
        .attr("stop-color", (d: GradientStop) => d.color);

      svg.append("line")
        .attr("x1", adjustedStartNodeX)
        .attr("y1", adjustedStartNodeY)
        .attr("x2", newEndX)
        .attr("y2", newEndY)
        .attr("stroke", `url(#${gradientId})`)
        .attr("stroke-width", "20")
        .attr("stroke-linecap", "round")
        .on("mouseover", function (event: MouseEvent) {
          tooltipDiv.transition()
            .duration(200)
            .style("opacity", 1);
          tooltipDiv.html(`<span style="color: ${edgeColor};">━━━</span> ${edgeType}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
          tooltipDiv.transition()
            .duration(500)
            .style("opacity", 0);
        });

    });

    svg.append("defs")
      .append("filter")
      .attr("id", "shadow")
      .append("feGaussianBlur")
      .attr("in", "SourceAlpha")
      .attr("stdDeviation", 3)
      .attr("result", "blur");

    return () => {
      svg.selectAll("*").remove();
    };
  }, [draggedPositions, results, polarEdges, centerPosition]);

  return <svg ref={svgRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -10, width: '100%', height: '100%' }}></svg>;
};

export default PolarNodeEdge;
