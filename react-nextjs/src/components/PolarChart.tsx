import React, { useEffect, useState } from 'react';
import { RootState } from '../redux/reducers';
import { useSelector, useDispatch } from '../hooks/hooks';
import { selectPolarNode, updateDraggedPosition } from '../redux/actions';
import PolarNode from './PolarNode';
import { calculatePolarCoordinates } from '../utils/polarCoordinates';
import { useDrop } from 'react-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ResultType } from '../types'

interface PolarChartProps {
  showDraggableComponents: boolean;
  displayDraggableComponents: () => void;
  hideDraggableComponents: () => void;
}

const PolarChart: React.FC<PolarChartProps> = ({ showDraggableComponents, displayDraggableComponents, hideDraggableComponents }) => {
  const dispatch = useDispatch();

  const position = useSelector((state: RootState) => state.searchBarPosition);
  const results = useSelector((state: RootState) => state.searchResults);
  const draggedPositions = useSelector((state: RootState) => state.draggedPositions);
  const centerPolarNode = useSelector((state: RootState) => state.centerPolarNode);
  const CenterPolarNodePosition = { x: position.x + 650, y: position.y - 100 };
  const nodesPerColumn = 6;
  const [isTextAreaOpen, setTextAreaOpen] = useState(false);
  const searchBarQuery = useSelector((state: RootState) => state.searchBarReducer);

  const [, drop] = useDrop({
    accept: 'POLAR_NODE',
  });

  const handleIconClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    setTextAreaOpen(!isTextAreaOpen);
    if (!isTextAreaOpen) {
      displayDraggableComponents();
    }
  };

  useEffect(() => {
    results.forEach((result: ResultType, index: number) => {
      const column = Math.floor(index / nodesPerColumn);
      const indexInColumn = index % nodesPerColumn;
      const totalInColumn = Math.min(nodesPerColumn, results.length - column * nodesPerColumn);
      const { x, y } = calculatePolarCoordinates(position, indexInColumn, totalInColumn, column);
      console.log(result)
      dispatch(updateDraggedPosition(-1, position.x, position.y));
      dispatch(updateDraggedPosition(index, x, y));
    });
  }, [results, dispatch, position]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement)?.closest('.polar-chart') && isTextAreaOpen) {
        if (searchBarQuery.query === '') {
          setTextAreaOpen(false);
          hideDraggableComponents();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dispatch, isTextAreaOpen, searchBarQuery, hideDraggableComponents]);


  return (
    <div ref={drop} style={{ position: 'absolute', left: 150, top: 15 }}>
      {results.map((result: ResultType, index: number) => {
        const nodeStyle = draggedPositions[index];

        return (
          <PolarNode
            key={index}
            id={index}
            onSelect={() => dispatch(selectPolarNode(index))}
            result={result}
            style={nodeStyle}
            updatePosition={(x: number, y: number) => {
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
          <FontAwesomeIcon icon={faSearch} size="lg" style={{ cursor: "pointer" }} width="15" height="15" />
        </div>
      }
      {!showDraggableComponents && centerPolarNode &&
        <PolarNode
          key={-1}
          id={-1}
          onSelect={() => dispatch(selectPolarNode(-1))}
          result={centerPolarNode}
          style={CenterPolarNodePosition}
          updatePosition={(x: number, y: number) => {
            dispatch(updateDraggedPosition(-1, x, y));
          }}
        />
      }
    </div>
  );
}

export default PolarChart;
