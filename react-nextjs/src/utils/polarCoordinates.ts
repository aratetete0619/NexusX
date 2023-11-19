type Center = {
  x: number;
  y: number;
};


export function calculatePolarCoordinates(
  center: Center,
  index: number,
  total: number,
  column: number
): { x: number; y: number } {
  const startAngle = (column - 1) * Math.PI / 6;
  const angle = startAngle + (2 * Math.PI * index) / total;
  const radius = getRadiusForColumn(column);
  const x = center.x + window.innerWidth / 2 - 250 + radius * Math.cos(angle);
  const y = center.y - 100 + radius * Math.sin(angle);

  return { x, y };
}


export function getColumnNumber(index: number, total: number) {
  let columnNumber = 1;
  let nodesInColumn = 6;

  while (index >= nodesInColumn) {
    columnNumber += 1;
    nodesInColumn += columnNumber * 6;
  }

  return columnNumber;
}

export function getRadiusForColumn(column: number) {
  const nodeDiameter = 160;
  const baseRadius = 270;
  const radiusIncrement = nodeDiameter;

  return baseRadius + radiusIncrement * column;
}
