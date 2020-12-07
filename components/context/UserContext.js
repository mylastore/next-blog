import React, {createContext, useContext, useState} from 'react'
export const UserContext = createContext(undefined)

const UserContextProvider = (props) => {
  const [user, setUser] = useState()
  const storeUser = user => {
    setUser({
      name: user.name,
      role: user.role,
      username: user.username,
      _id: user._id,
      createdAt: user.createdAt,
      avatar: user.avatar
    })
  }
  const logout = () => {
    setUser({})
  }

  return (
    <UserContext.Provider value={{user, storeUser}}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider