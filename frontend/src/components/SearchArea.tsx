import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from '../styles/SearchArea.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { setFocus } from '../redux/actions';
import ResizableTextArea from './ResizableTextArea';








const SearchArea = ({ setShowEdges }) => {
  const dispatch = useDispatch();
  const [isCircle, setIsCircle] = useState(false);
  const [query, setQuery] = useState('');
  const searchBarRef = useRef(null);
  const textAreaRef = useRef(null);




  const handleCircleClick = () => {
    setIsCircle(false);
    setTimeout(() => {
      if (textAreaRef.current) { // Check if textAreaRef.current is not null
        textAreaRef.current.style.height = 'inherit';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }, 0);
  };


  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target) && !isCircle) {
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
