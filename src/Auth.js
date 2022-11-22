
import React, { useEffect, useState } from "react";
import fire from "./fire";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  // const [userData, setUserData] = useState();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user)
      // setUserData(user)
      setPending(false)
    });
  }, []);

  if(pending){
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};