import {useContext, useEffect} from 'react'
import Router from 'next/router'
import parseCookies from "../../helpers/parseCookies";
import {handleAuthSSR} from "../../actions/authSSR";
import {UserContext} from "../context/UserContext";

const AuthComponent = ({children, token}) => {
  const { user, storeUser } = useContext(UserContext)

  // useEffect(() => {
  //   !token && Router.push(`/`)
  // }, [])

  return (
    <div className={'container'}>
      {children}
    </div>
  )
}

export async function getServerSideProps({req, res}) {
  const cookies = parseCookies(req)
  console.log('cookies ', cookies)
  if (cookies.token) {
    await handleAuthSSR(req, res)
    return {
      props: {
        token: cookies.token
      }
    }
  } else {
    return {props: {}}
  }

}

export default AuthComponent