import React, { useState, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/SearchArea.module.css';
import { useDispatch } from 'react-redux';
import { setFocus, setResults } from '../redux/actions';


const SEARCH_QUERY = gql`
  query Search($query: String!) {
    search(query: $query) {
      originalQuery
      preprocessedQuery
      neo4jData {
        identity
        labels
        properties {
          name
          esId
          imagePath
        }
        elementId
      }
      description
      score
    }
  }
`;



const SearchArea = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [isCircle, setIsCircle] = useState(false);
  const searchBarRef = useRef(null);
  const textAreaRef = useRef(null);
  const { data, refetch } = useQuery(SEARCH_QUERY, { skip: true });

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    textAreaRef.current.style.height = 'inherit';
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const handleSearch = () => {
    setIsCircle(true);
    refetch({ query }).then((response) => {
      if (response.data.search) { // 結果がある場合のみディスパッチ
        dispatch(setResults(response.data.search));
      } else { // 結果がない場合、空配列をディスパッチ
        dispatch(setResults([]));
      }
    });
  };

  const handleCircleClick = () => {
    setIsCircle(false);
    setTimeout(() => {
      textAreaRef.current.style.height = 'inherit';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }, 0);
  };

  const handleClickOutside = (event) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
      setIsCircle(true);
      dispatch(setFocus(false));
    }
  };

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
          <p>{query}</p>
        </div>
      ) : (
        <>
          <textarea
            ref={textAreaRef}
            value={query}
            onChange={handleInputChange}
            className={styles.searchInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} onClick={handleSearch} size="lg" />
        </>
      )}
    </div>
  );
};

export default SearchArea;
