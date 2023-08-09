// components/PolarChart.tsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectPolarNode, updateDraggedPosition } from '../redux/actions';
import PolarNode from './PolarNode';
import { calculatePolarCoordinates } from '../utils/polarCoordinates';
import { useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const PolarChart = ({ showDraggableComponents, displayDraggableComponents, hideDraggableComponents }) => {
  const dispatch = useDispatch();

  const position = useSelector((state) => state.searchBarPosition);
  const results = useSelector((state) => state.searchResults);
  const draggedPositions = useSelector((state) => state.draggedPositions);
  const centerPolarNode = useSelector((state) => state.centerPolarNode);
  const CenterPolarNodePosition = { x: position.x + 650, y: position.y - 100 };
  const nodesPerColumn = 6;
  const [isTextAreaOpen, setTextAreaOpen] = useState(false);
  const searchBarQuery = useSelector((state) => state.searchBarReducer);

  const [, drop] = useDrop({
    accept: 'POLAR_NODE',
  });

  const handleIconClick = (event) => {
    event.stopPropagation();
    setTextAreaOpen(!isTextAreaOpen);
    if (!isTextAreaOpen) {
      displayDraggableComponents();
    }
  };

  // Add a new useEffect that runs when the results change
  useEffect(() => {
    results.forEach((result, index) => {
      const column = Math.floor(index / nodesPerColumn);
      const indexInColumn = index % nodesPerColumn;
      const totalInColumn = Math.min(nodesPerColumn, results.length - column * nodesPerColumn);
      const { x, y } = calculatePolarCoordinates(position, indexInColumn, totalInColumn, column);

      dispatch(updateDraggedPosition(-1, position.x, position.y));
      dispatch(updateDraggedPosition(index, x, y));
    });
  }, [results]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.polar-chart') && isTextAreaOpen) {
        if (searchBarQuery === '') {
          setTextAreaOpen(false);
          hideDraggableComponents();
          dispatch(resetCenterPolarNode());
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, isTextAreaOpen, searchBarQuery]);

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

      {!showDraggableComponents && centerPolarNode &&
        <div
          style={{
            position: "absolute",
            left: position.x + 810,
            top: position.y - 90,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
            width: "50px",
            zIndex: 999,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
          }}
          onClick={handleIconClick}
        >
          <FontAwesomeIcon icon={faSearch} size="lg" style={{ cursor: "pointer" }} />
        </div>
      }
      {!showDraggableComponents && centerPolarNode &&
        <PolarNode
          key={-1}
          id={-1}
          onSelect={() => dispatch(selectPolarNode(-1))}
          result={centerPolarNode}
          style={CenterPolarNodePosition}
          updatePosition={(x, y) => {
            dispatch(updateDraggedPosition(-1, x, y));
          }}
        />
      }
    </div>
  );
}

export default PolarChart;
