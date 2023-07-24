import React from 'react';

interface EdgeSvgProps {
  fromHandle: { x: number, y: number }; // 修正：ハンドルの情報を受け取る
  toHandle: { x: number, y: number }; // 修正：ハンドルの情報を受け取る
  color: string;
}

const EdgeSvg: React.FC<EdgeSvgProps> = ({ fromHandle, toHandle, color }) => { // 修正：props名を変更
  return (
    <line
      x1={fromHandle.x}
      y1={fromHandle.y}
      x2={toHandle.x}
      y2={toHandle.y}
      stroke={color}
      strokeWidth={2}
    />
  );
};

export default EdgeSvg;
