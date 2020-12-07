import {useEffect} from 'react'
import Router from 'next/router'
import {isAuth} from '../../actions/auth'
import UserNav from "./UserNav"

const UserComponent = ({children}) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push(`/login`)
    }
  }, [])
  return (

    <div className="row">
      <div className="col-md-3">
        <UserNav/>
      </div>
      <div className="col-md-9">
        {children}
      </div>
    </div>
  )
}

export default UserComponent