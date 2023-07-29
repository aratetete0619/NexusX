// components/DraggableSearchArea.tsx
import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { updateSearchBarPosition } from '../redux/actions/searchBarPosition';
import SearchArea from './SearchArea';
import { getEmptyImage } from 'react-dnd-html5-backend';

const DraggableSearchArea = () => {
  const dispatch = useDispatch();
  const position = useSelector((state) => state.searchBarPosition);
  const isFocused = useSelector((state) => state.searchBarFocus);

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
  }, []);

  useEffect(() => {
    const windowWidth = window.innerWidth / 2;
    const windowHeight = window.innerHeight / 2;
    dispatch(updateSearchBarPosition({ x: 0, y: windowHeight }));
  }, [dispatch]);

  return (
    <div ref={drag} style={{ position: 'absolute', left: position.x, top: position.y, opacity: isDragging ? 0 : 1, width: '100%' }}>
      <SearchArea />
    </div>
  );
};

export default DraggableSearchArea;
