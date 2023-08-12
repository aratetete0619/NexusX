import React, { useEffect } from 'react';
import { useDispatch, useSelector } from '../hooks/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { startEdgeCreation, endEdgeCreation, addEdge } from '../redux/actions';
import '../styles/Handle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { setHandlePosition } from '../redux/reducers/handles';
import { RootState } from '../redux/reducers';
import { useMeasure } from 'react-use';

interface HandleProps {
  nodeId: string;
  position: "top" | "bottom" | "left" | "right";
  onPositionChange: (coords: { x: number; y: number }) => void;
}

interface DragItem {
  type: string;
  nodeId: string;
  position: "top" | "bottom" | "left" | "right";
}


const Handle: React.FC<HandleProps> = ({ nodeId, position }) => {
  const dispatch = useDispatch();
  const handleClass = `handle handle-${position}`;
  const { isEdgeCreationMode, startNodeId } = useSelector((state: RootState) => state.edgeCreation);
  const startNodeIdValue = startNodeId || { nodeId: '', position: '' };
  const [ref, bounds] = useMeasure();



  const [{ isDragging }, drag] = useDrag({
    type: `Handle`,
    item: { nodeId, position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }, [dispatch, isEdgeCreationMode, nodeId, position, startNodeIdValue.nodeId, startNodeIdValue.position]);
  const dragIsDragging = isDragging as boolean;

  const [, drop] = useDrop({
    accept: `Handle`,
    drop: (item: DragItem, monitor) => {
      if (monitor.didDrop()) {
        return;
      }
      if (!startNodeId) {
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
  }, [dispatch, nodeId, position, bounds.left, bounds.width, bounds.top, bounds.height]);

  useEffect(() => {
    if (dragIsDragging && !isEdgeCreationMode) {
      dispatch(startEdgeCreation(nodeId, position));
    } else if (!dragIsDragging && isEdgeCreationMode && startNodeId && startNodeId.nodeId === nodeId && startNodeId.position === position) {
      dispatch(endEdgeCreation());
    }
  }, [dragIsDragging, dispatch, isEdgeCreationMode, nodeId, position, startNodeIdValue.nodeId, startNodeIdValue.position]);

  return (
    <div className={handleClass} ref={ref => drag(drop(ref))}>
      <FontAwesomeIcon icon={faCircle} className="fa-xs" />
    </div>
  );
};

export default Handle;
