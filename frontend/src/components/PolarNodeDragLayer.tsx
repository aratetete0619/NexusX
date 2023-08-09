// components/PolarNodeDragLayer.tsx
import React from 'react';
import { useDragLayer } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { selectPolarNode } from '../redux/actions';
import PolarNode from './PolarNode';

const getItemStyles = (initialOffset: XYCoord | null, currentOffset: XYCoord | null) => {
  if (!initialOffset || !currentOffset) {
    return { display: 'none' };
  }
  const x = currentOffset.x;
  const y = currentOffset.y - 50;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
    position: 'absolute',
  };
};


const PolarNodeDragLayer: React.FC = () => {
  const dispatch = useDispatch();
  const results = useSelector((state) => state.searchResults);
  const draggedPositions = useSelector((state) => state.draggedPositions);  // Select the dragged positions from the store

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


  if (!isDragging || itemType !== 'POLAR_NODE' || !item) {
    return null;
  }

  // Get the result for this node
  const result = results[item.id];
  // Get the dragged position for this node
  const dragPosition = draggedPositions[item.id];

  return (
    <div style={getItemStyles(initialOffset, currentOffset)}>
      <PolarNode
        id={item.id}
        onSelect={() => dispatch(selectPolarNode(item.id))}
        result={result}
      />
    </div>

  );
};

export default PolarNodeDragLayer;
