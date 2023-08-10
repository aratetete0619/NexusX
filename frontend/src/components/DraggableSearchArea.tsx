import React, { useEffect, FC } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { updateSearchBarPosition } from '../redux/actions/searchBarPosition';
import SearchArea from './SearchArea';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { RootState } from '../redux/store';

interface DraggableSearchAreaProps {
  setShowEdges: (value: boolean) => void;
}

const DraggableSearchArea: FC<DraggableSearchAreaProps> = ({ setShowEdges }) => {
  const dispatch = useDispatch();
  const position = useSelector((state: RootState) => state.searchBarPosition);
  const isFocused = useSelector((state: RootState) => state.searchBarFocus);

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'SEARCH_BAR',
    item: () => ({ x: position.x, y: position.y }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isFocused,
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const x = Math.round(item.x + delta.x);
        const y = Math.round(item.y + delta.y);
        dispatch(updateSearchBarPosition({ x, y }));
      }
    },
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  useEffect(() => {
    const windowWidth = window.innerWidth / 2;
    const windowHeight = window.innerHeight / 2;
    dispatch(updateSearchBarPosition({ x: 0, y: windowHeight }));
  }, [dispatch]);

  return (
    <div
      ref={drag}
      style={{ position: 'absolute', left: position.x, top: position.y, opacity: isDragging ? 0 : 1, width: '100%' }}
      onMouseDown={(event) => event.stopPropagation()}
    >
      <SearchArea setShowEdges={setShowEdges} />
    </div>
  );
};

export default DraggableSearchArea;
