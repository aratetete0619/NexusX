// components/ResizableTextArea.tsx
import React, { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFocus, setResults, updateQuery, selectPolarNode } from '../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import styles from '../styles/SearchArea.module.css';

const SEARCH_QUERY = gql`
  query Search($query: String!) {
    search(query: $query) {
      originalQuery
      preprocessedQuery
      startNode {
        identity
        labels
        properties {
          name
          esId
          imagePath
          description
        }
      }
      score
    }
  }
`

const ResizableTextArea = ({ setIsCircle, query, setQuery, setShowEdges }) => {
  const textAreaRef = useRef(null);
  const dispatch = useDispatch();
  const { data, refetch } = useQuery(SEARCH_QUERY, { skip: true });

  const handleFocus = () => {
    dispatch(setFocus(true));
  };

  const handleBlur = () => {
    dispatch(setFocus(false));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    dispatch(updateQuery(newQuery));
    dispatch(selectPolarNode(null))
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
    textAreaRef.current.style.height = 'inherit';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
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
        setIsCircle={setIsCircle()}
      />
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} onClick={handleSearch} size="lg" />
    </div>
  );
};

export default ResizableTextArea;
