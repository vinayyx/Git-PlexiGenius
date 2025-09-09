import React, { createContext, useState } from "react";

export const CounterContext = createContext();

const ContextProvider = ({ children }) => {

  const [selectedId, setSelectedId] = useState(null);
    const [Employee, setEmployee] = useState([]);
  
 

  const value = { setEmployee , Employee, selectedId, setSelectedId }; // ye value children me available hoga

  return (
    <CounterContext.Provider value={value}>
      {children}
    </CounterContext.Provider>
  );
};

export default ContextProvider;
