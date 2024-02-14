import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(true);
    

  return (
    <UserContext.Provider value={{user,setUser,auth, setAuth }}>
      {children}
    </UserContext.Provider>
  );
}
