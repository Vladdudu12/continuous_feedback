// Create a context
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const IsProfessorProvider = ({ children }) => {
  const [isProfessor, setIsProfessor] = useState(false);

  return (
    <AppContext.Provider value={{ isProfessor, setIsProfessor }}>
      {children}
    </AppContext.Provider>
  );
};


export const useIsProfessor = () => {
    return useContext(AppContext);
  };

export default IsProfessorProvider;
