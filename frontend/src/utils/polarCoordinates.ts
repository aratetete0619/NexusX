// utils/polarCoordinates.ts

export function calculatePolarCoordinates(center, index, total, column) {
  const startAngle = (column - 1) * Math.PI / 6; // Calculate the start angle for this column
  const angle = startAngle + (2 * Math.PI * index) / total; // Calculate the angle in radian
  const radius = getRadiusForColumn(column); // Get the radius based on the column
  const x = center.x + window.innerWidth / 2 - 250 + radius * Math.cos(angle); // Calculate the x position
  const y = center.y - 100 + radius * Math.sin(angle); // Calculate the y position

  return { x, y };
}


export function getColumnNumber(index, total) {
  let columnNumber = 1;
  let nodesInColumn = 6; // start with 6 nodes in the first column

  while (index >= nodesInColumn) {
    columnNumber += 1;
    nodesInColumn += columnNumber * 6; // increase nodes in column for each new column
  }

  return columnNumber;
}

export function getRadiusForColumn(column) {
  const nodeDiameter = 160; // Node diameter in pixels
  const baseRadius = 270; // Base radius value in pixels
  const radiusIncrement = nodeDiameter; // Increment value for each column

  return baseRadius + radiusIncrement * column;
}
