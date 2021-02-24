import React, {createContext, useState, useEffect} from "react"
import {getCookie, setCookie} from "../../actions/auth/auth";

export const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(()=>{
    const localData = getCookie('rememberMe');
    return localData ? JSON.parse(localData) : null;
  })

  useEffect(() => {
    (async () => {
       await setCookie(JSON.stringify(user))
    })()
  }, [user]);

  return(
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserContextProvider
