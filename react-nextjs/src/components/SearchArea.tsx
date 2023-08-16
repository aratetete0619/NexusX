import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../styles/SearchArea.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { setFocus } from '../redux/actions';
import ResizableTextArea from './ResizableTextArea';

interface SearchAreaProps {
  setShowEdges: (showEdges: boolean) => void;
}

const SearchArea: React.FC<SearchAreaProps> = ({ setShowEdges }) => {
  const dispatch = useDispatch();
  const [isCircle, setIsCircle] = useState(false);
  const [query, setQuery] = useState('');
  const searchBarRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);


  const handleCircleClick = () => {
    setIsCircle(false);
    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'inherit';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }, 0);
  };


  const handleClickOutside = (event: MouseEvent) => {
    const isOutsideClick = searchBarRef.current && !searchBarRef.current.contains(event.target as Node) && !isCircle;

    if (isOutsideClick) {
      setIsCircle(true);
      dispatch(setFocus(false));
    }
  };


  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className={styles.searchBarContainer} ref={searchBarRef}>
      {isCircle ? (
        <div className={styles.circle} onClick={handleCircleClick}>
          <FontAwesomeIcon icon={faSearch} className={styles.circleSearchIcon} size="lg" />
          <p>{query}</p>
        </div>
      ) : (
        <>
          <ResizableTextArea
            setIsCircle={setIsCircle}
            setQuery={setQuery}
            query={query}
            setShowEdges={setShowEdges}
          />
        </>
      )}
    </div>
  );
};

export default SearchArea;
