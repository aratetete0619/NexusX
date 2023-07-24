// components/CustomDragLayer.tsx
import React from 'react';
import { useDragLayer, XYCoord } from 'react-dnd';
import SearchArea from './SearchArea';

function getItemStyles(initialOffset: XYCoord | null, currentOffset: XYCoord | null) {
  if (!initialOffset || !currentOffset) {
    return {
      display: 'none',
    };
  }
  let { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    position: 'absolute',
    width: '300px',
  };
}

const CustomDragLayer: React.FC = () => {
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
      <SearchArea />
    </div>
  );
};

export default CustomDragLayer;
