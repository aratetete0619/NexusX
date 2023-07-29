// components/PolarChart.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPolarNode, updateDraggedPosition } from '../redux/actions';
import PolarNode from './PolarNode';
import { calculatePolarCoordinates } from '../utils/polarCoordinates';
import { useDrop } from 'react-dnd';

const PolarChart = () => {
  const dispatch = useDispatch();

  const position = useSelector((state) => state.searchBarPosition);
  const results = useSelector((state) => state.searchResults);
  const draggedPositions = useSelector((state) => state.draggedPositions);
  const nodesPerColumn = 6;

  const [, drop] = useDrop({
    accept: 'POLAR_NODE',
  });

  // Add a new useEffect that runs when the results change
  useEffect(() => {
    // For each result, calculate the initial position and update it in the store
    results.forEach((result, index) => {
      const column = Math.floor(index / nodesPerColumn);
      const indexInColumn = index % nodesPerColumn;
      const totalInColumn = Math.min(nodesPerColumn, results.length - column * nodesPerColumn);
      const { x, y } = calculatePolarCoordinates(position, indexInColumn, totalInColumn, column);

      dispatch(updateDraggedPosition(index, x, y));  // Update the position in the store
    });
  }, [results]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.polar-chart')) {
        dispatch(selectPolarNode(null));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch]);

  return (
    <div ref={drop} style={{ position: 'absolute', left: 150, top: 15 }}>
      {results.map((result, index) => {
        const nodeStyle = draggedPositions[index];

        return (
          <PolarNode
            key={index}
            id={index}
            onSelect={() => dispatch(selectPolarNode(index))}
            result={result}
            style={nodeStyle}
            updatePosition={(x, y) => {
              dispatch(updateDraggedPosition(index, x, y));
            }}
          />
        );
      })}
    </div>
  );
};

export default PolarChart;
