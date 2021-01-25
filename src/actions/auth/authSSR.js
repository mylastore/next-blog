import {api} from '../api'
import parseCookies from "./parseCookies";
export default async function handleAuthSSR(req) {
  const cookies = parseCookies(req)
  if (req) {
    const isAuth = await api('GET', "auth", {}, cookies.token)
    if(isAuth.status === 401){
      return {
        redirect: {
          permanent: false,
          destination: '/user/login',
        },
        props: {
          token: null
        }
      }
    } else{
      return {
        props: {
          token: cookies.token
        }
      }
    }
  }

}
