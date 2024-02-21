import { createContext, useState,useEffect } from "react";
import { supabase } from "../authorization/Supabase";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [auth, setAuth] = useState(true);
  const [session, setSession] = useState(null)
  
  const libraries = {libraries:['places']}


  const  handleSignOut = async () => {
    console.log("handleSignOut");
    const { error } = await supabase.auth.signOut()
    window.location.href = '/'
    if (error) console.log('Error logging out:', error.message)
  };




  useEffect(() => {
    const subscription = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          setSession(null)
        } else if (session) {
          setSession(session)
        }
      })

  }, [])

  return (
    <UserContext.Provider value={{  auth, setAuth,handleSignOut,session,libraries }}>
      {children}
    </UserContext.Provider>
  );
}
