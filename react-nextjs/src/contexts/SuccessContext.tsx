import React, { createContext, useState, ReactNode } from 'react';

type SuccessContextType = {
  successMessage: string;
  showSuccess: (message: string) => void;
};

export const SuccessContext = createContext<SuccessContextType | undefined>(undefined);

interface SuccessProviderProps {
  children: ReactNode;
}

export const SuccessProvider: React.FC<SuccessProviderProps> = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 10000);
  };

  return (
    <SuccessContext.Provider value={{ successMessage, showSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
};
