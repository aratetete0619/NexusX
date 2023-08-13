// components/CustomDragLayer.tsx
import React, { FC } from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import SearchArea from './SearchArea';

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x + 750}px, ${y - 50}px)`;
  return {
    transform,
    WebkitTransform: transform,
    width: '300px',
  };
}

interface CustomDragLayerProps {
  setShowEdges: (value: boolean) => void;
}

const CustomDragLayer: FC<CustomDragLayerProps> = ({ setShowEdges }) => {
  const {
    itemType,
    isDragging,
    item,
    initialOffset,
    currentOffset,
  } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging(),
  }));

  if (!isDragging || itemType !== 'SEARCH_BAR') {
    return null;
  }

  return (
    <div style={getItemStyles(initialOffset, currentOffset)}>
      <SearchArea setShowEdges={setShowEdges} />
    </div>
  );
};

export default CustomDragLayer;
