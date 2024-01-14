// Create a context
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState('');

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};


export const useUserId = () => {
    return useContext(AppContext);
  };

export default UserIdProvider;
