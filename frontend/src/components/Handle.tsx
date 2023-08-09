import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';
import { startEdgeCreation, endEdgeCreation, addEdge } from '../redux/actions';
import '../styles/Handle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { setHandlePosition } from '../redux/reducers/handles';
import { useMeasure } from 'react-use';

interface HandleProps {
  nodeId: string;
  position: "top" | "bottom" | "left" | "right";
}

interface DragItem extends DragObjectWithType {
  nodeId: string;
  position: "top" | "bottom" | "left" | "right";
}

const Handle: React.FC<HandleProps> = ({ nodeId, position }) => {
  const dispatch = useDispatch();
  const node = useSelector(state => state.nodes[nodeId]);
  const handleClass = `handle handle-${position}`;
  const { isEdgeCreationMode, startNodeId } = useSelector(state => state.edgeCreation);
  const [ref, bounds] = useMeasure();

  const [{ isDragging: dragIsDragging }, drag] = useDrag({
    type: `Handle`,
    item: { nodeId, position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: `Handle`,
    drop: (item: DragItem, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      dispatch(addEdge(startNodeId.nodeId, startNodeId.position, nodeId, position));
      dispatch(endEdgeCreation());
    },
    canDrop: (item: DragItem) => item.nodeId !== nodeId || item.position !== position,
  });

  useEffect(() => {
    const handleX = bounds.left + (position === 'left' ? 0 : bounds.width);
    const handleY = bounds.top + bounds.height / 2;
    dispatch(setHandlePosition({ nodeId, position, x: handleX, y: handleY }));
  }, [dispatch, nodeId, position, bounds]);  // 依存配列に`bounds`を追加

  useEffect(() => {
    if (dragIsDragging && !isEdgeCreationMode) {
      dispatch(startEdgeCreation(nodeId, position));
    } else if (!dragIsDragging && isEdgeCreationMode && startNodeId.nodeId === nodeId && startNodeId.position === position) {
      dispatch(endEdgeCreation());
    }
  }, [dragIsDragging]);

  return (
    <div className={handleClass} ref={ref => drag(drop(ref))}>
      <FontAwesomeIcon icon={faCircle} className="fa-xs" />
    </div>
  );
};

export default Handle;
