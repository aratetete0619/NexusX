import React, { useState, forwardRef, Ref } from 'react';
import { useQuery } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/SearchArea.module.css';
import { SEARCH_QUERY } from '../graphql/mutations'


const StaticSearchBar = forwardRef<HTMLDivElement>((props, ref) => {
  const [query, setQuery] = useState('');
  const { data, refetch } = useQuery(SEARCH_QUERY, { skip: true });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    refetch({ query });
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

StaticSearchBar.displayName = 'StaticSearchBar';

export default StaticSearchBar;
