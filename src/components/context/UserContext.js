import React, {createContext, useState, useEffect} from "react"
import {getCookie, setCookie} from "../../actions/auth";

export const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(()=>{
    const localData = getCookie('rememberMe');
    return localData ? JSON.parse(localData) : null;
  })

  useEffect(() => {
    (async () => {
      await setCookie('rememberMe', JSON.stringify(user), {expires: 7, sameSite: 'strict'});
    })()
  }, [user]);

  return(
    <UserContext.Provider value={{user, setUser}}>
      {props.children}
    </UserContext.Provider>
  )

}

export default UserContextProvider