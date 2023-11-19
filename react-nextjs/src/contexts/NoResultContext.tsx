import React, { createContext, useState, ReactNode } from 'react';
import NoResultPopup from '../components/NoResultPopup';

type NoResultContextType = {
  showNoResult: (message: string) => void;
  hideNoResult: () => void;
  noResultMessage: string;
  isNoResultVisible: boolean;
};

export const NoResultContext = createContext<NoResultContextType | undefined>(undefined);

interface NoResultProviderProps {
  children: ReactNode;
}

export const NoResultProvider: React.FC<NoResultProviderProps> = ({ children }) => {
  const [noResultMessage, setNoResultMessage] = useState('');
  const [isNoResultVisible, setIsNoResultVisible] = useState(false);

  const showNoResult = (message: string) => {
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
      {isNoResultVisible && <NoResultPopup />}
    </NoResultContext.Provider>
  );
};
