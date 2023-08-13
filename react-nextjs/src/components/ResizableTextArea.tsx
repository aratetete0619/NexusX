// components/ResizableTextArea.tsx
import { setFocus, setResults, updateQuery, selectPolarNode } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import styles from '../styles/SearchArea.module.css';
import { RESIZABLE_SEARCH_QUERY } from '../graphql/mutations'



interface ResizableTextAreaProps {
  setIsCircle: (value: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  setShowEdges: (value: boolean) => void;
}

const ResizableTextArea: React.FC<ResizableTextAreaProps> = ({ setIsCircle, query, setQuery, setShowEdges }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();
  const { data, refetch } = useQuery(RESIZABLE_SEARCH_QUERY, { skip: true });

  const handleFocus = () => {
    dispatch(setFocus(true));
  };

  const handleBlur = () => {
    dispatch(setFocus(false));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    dispatch(updateQuery(newQuery));
    dispatch(selectPolarNode(null));
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'inherit';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };


  const handleSearch = () => {
    setIsCircle(true);
    setShowEdges(false)
    refetch({ query }).then((response) => {
      if (response.data.search) {
        dispatch(setResults(response.data.search));
      } else {
        dispatch(setResults([]));
      }
    });
  };

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'inherit';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [query]);

  return (
    <div className={styles.searchBarContainer} >
      <textarea
        ref={textAreaRef}
        value={query}
        className={styles.searchInput}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} onClick={handleSearch} size="lg" />
    </div>
  );
};

export default ResizableTextArea;
