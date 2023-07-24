// components/SearchArea.tsx
import React, { useState, forwardRef } from 'react';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/SearchArea.module.css';

const SEARCH_QUERY = gql`
  mutation Search($query: String!) {
    search(query: $query) {
      original_query
      preprocessed_query
      search_results {
        neo4j_data {
          id
          labels
          properties
        }
        description
        score
      }
    }
  }
`;

const SearchArea = forwardRef((props, ref) => {
  const [query, setQuery] = useState('');
  const [search, { data }] = useMutation(SEARCH_QUERY);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    search({ variables: { query } });
  };

  return (
    <div className={styles.searchBarContainer} ref={ref}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className={styles.searchInput}
      />
      <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} onClick={handleSearch} size="lg" />
    </div>
  );
});

export default SearchArea;
