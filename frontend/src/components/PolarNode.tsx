// components/PolarNode.tsx
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';
import styles from '../styles/PolarNode.module.css';

const PolarNode = ({ id, onSelect, result, style, updatePosition }) => {
  const selectedNodeId = useSelector((state) => state.selectedPolarNode);

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'POLAR_NODE',
    item: () => ({ id, x: style.left, y: style.top }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      console.log({ style })
      if (delta && style) {
        updatePosition(style.x + delta.x, style.y + delta.y);
      }
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  if (!result) return null;

  const name = result.neo4jData.properties.name;
  const imagePath = result.neo4jData.properties.imagePath;

  return (
    <div
      ref={drag}
      style={{ position: 'absolute', left: style.x, top: style.y }}
    >
      <div
        className={`${styles.circle} ${id === selectedNodeId ? styles.selected : ''} ${imagePath ? styles.withImage : ''}`}
        style={{
          backgroundImage: imagePath ? `url(/${imagePath})` : 'none',
        }}
        onClick={onSelect}
      >
        {!imagePath && name}
        {imagePath && <div className={styles.nameBelow}>{name}</div>}
      </div>
    </div>
  );
};

export default PolarNode;
