// src/contexts/ErrorContext.tsx
import React, { createContext, useState } from 'react';

export const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const showError = (message) => {
    setErrorMessage(message);
    setIsErrorVisible(true);
  };

  const hideError = () => {
    setErrorMessage('');
    setIsErrorVisible(false);
  };

  return (
    <ErrorContext.Provider value={{ showError, hideError, errorMessage, isErrorVisible }}>
      {children}
    </ErrorContext.Provider>
  );
};
