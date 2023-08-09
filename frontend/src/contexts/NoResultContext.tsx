import React, { createContext, useState } from 'react';
import NoResultPopup from '../components/NoResultPopup';

export const NoResultContext = createContext();

export const NoResultProvider = ({ children }) => {
  const [noResultMessage, setNoResultMessage] = useState('');
  const [isNoResultVisible, setIsNoResultVisible] = useState(false);

  const showNoResult = (message) => {
    setNoResultMessage(message);
    setIsNoResultVisible(true);
  };

  const hideNoResult = () => {
    setNoResultMessage('');
    setIsNoResultVisible(false);
  };

  return (
    <NoResultContext.Provider value={{ showNoResult, hideNoResult, noResultMessage, isNoResultVisible }}>
      {children}
      {isNoResultVisible && <NoResultPopup message={noResultMessage} />}
    </NoResultContext.Provider>
  );
};
