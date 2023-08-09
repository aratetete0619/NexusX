import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as d3 from 'd3';
import styles from '../styles/PolarNodeEdge.module.css'


interface PolarNodeEdgeProps { }

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



const PolarNodeEdge: React.FC<PolarNodeEdgeProps> = () => {
  const svgRef = useRef(null);
  const draggedPositions = useSelector((state) => state.draggedPositions);
  const results = useSelector((state) => state.searchResults);
  const centerPosition = useSelector((state) => state.searchBarPosition);
  const polarEdges = useSelector((state) => state.polarEdges);

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


    results.forEach((_, i) => {
      const endNodePosition = draggedPositions[i.toString()];
      if (!endNodePosition) return;

      const adjustedEndNodeX = endNodePosition.x + 250;
      const adjustedEndNodeY = endNodePosition.y + 100;
      const edgeType = polarEdges[i]?.relationship.type;
      console.log(edgeType)
      const edgeColor = edgeType ? stringToColor(edgeType) : "rgba(0, 0, 0, 0.2)";

      // 方向ベクトルの計算
      const dirX = adjustedEndNodeX - adjustedStartNodeX;
      const dirY = adjustedEndNodeY - adjustedStartNodeY;

      // ベクトルの長さの計算
      const length = Math.sqrt(dirX * dirX + dirY * dirY);

      // ベクトルを所望の長さにスケーリング
      const scaleFactor = 0.9; // 例: エッジの長さを80%に縮小
      const newLength = length * scaleFactor;

      const scaledDirX = dirX * (newLength / length);
      const scaledDirY = dirY * (newLength / length);

      // 新しいエンドポイントの計算
      const newEndX = adjustedStartNodeX + scaledDirX;
      const newEndY = adjustedStartNodeY + scaledDirY;

      // エッジの描画
      const gradientId = `gradient${i}`;

      // グラデーションを定義
      svg.append("defs")
        .append("linearGradient")
        .attr("id", gradientId)
        .selectAll("stop")
        .data([
          { offset: "0%", color: "white" }, // 始点の色
          { offset: "100%", color: edgeColor } // 終点の色
        ])
        .enter()
        .append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

      // エッジを描画し、上で定義したグラデーションを適用
      svg.append("line")
        .attr("x1", adjustedStartNodeX)
        .attr("y1", adjustedStartNodeY)
        .attr("x2", newEndX)
        .attr("y2", newEndY)
        .attr("stroke", `url(#${gradientId})`) // グラデーションの適用
        .attr("stroke-width", "20") // 線の太さ
        .attr("stroke-linecap", "round") // 線の端を丸くする
        .on("mouseover", function (event) {
          // ツールチップの表示ロジック
          tooltipDiv.transition()
            .duration(200)
            .style("opacity", 1);
          tooltipDiv.html(`<span style="color: ${edgeColor};">━━━</span> ${edgeType}`)
            .style("left", (event.pageX) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function () {
          // ツールチップの非表示ロジック
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
      .attr("stdDeviation", 3) // ぼかしの強度
      .attr("result", "blur");





    // コンポーネントがアンマウントされたときのクリーンアップ処理
    return () => {
      svg.selectAll("*").remove(); // SVGの内容をクリア
    };
  }, [draggedPositions, results, polarEdges]);

  return <svg ref={svgRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -10, width: '100%', height: '100%' }}></svg>;
};

export default PolarNodeEdge;
