import React, { createContext, useState } from 'react';

type SuccessContextType = {
  successMessage: string;
  showSuccess: (message: string) => void;
};
export const SuccessContext = createContext<SuccessContextType | undefined>(undefined);

export const SuccessProvider = ({ children }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const showSuccess = (message) => {
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
