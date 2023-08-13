import React, { createContext, useState, FC, ReactNode } from 'react';

interface ErrorContextProps {
  showError: (message: string) => void;
  hideError: () => void;
  errorMessage: string;
  isErrorVisible: boolean;
}

export const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isErrorVisible, setIsErrorVisible] = useState<boolean>(false);

  const showError = (message: string) => {
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
