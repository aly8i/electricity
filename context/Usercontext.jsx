import React, { createContext, useState } from 'react';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [login,setlogin] = useState(null);
  const [data,setData] = useState([]);
  const [fData,setFData] = useState([]);
  const [sUser,setSUser] = useState("");
  const contextValue = {
    login,setlogin,data,setData,fData,setFData,sUser,setSUser
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };