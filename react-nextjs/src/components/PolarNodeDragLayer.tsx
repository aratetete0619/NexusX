import React from 'react';
import { RootState } from '../redux/reducers';
import { useDragLayer } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { selectPolarNode } from '../redux/actions';
import PolarNode from './PolarNode';
import { XYCoord } from 'react-dnd';

const getItemStyles = (initialOffset: XYCoord | null, currentOffset: XYCoord | null): React.CSSProperties => {
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



const PolarNodeDragLayer: React.FC = ({ }) => {
  const dispatch = useDispatch();
  const results = useSelector((state: RootState) => state.searchResults);
  const draggedPositions = useSelector((state: RootState) => state.draggedPositions);

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

  const result = results[item.id];
  const dragPosition = draggedPositions[item.id];

  return (
    <div style={getItemStyles(initialOffset, currentOffset)}>
      <PolarNode
        id={item.id}
        onSelect={() => dispatch(selectPolarNode(item.id))}
        result={result}
        style={{ x: 0, y: 0 }}
        updatePosition={() => { }}
      />
    </div>

  );
};

export default PolarNodeDragLayer;
