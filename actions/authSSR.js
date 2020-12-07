import {api} from './api'
import {Cookies} from 'react-cookie'

const cookies = new Cookies()

export async function handleAuthSSR(req, res, next) {
  let token
console.log('handleAuthSSR')
  if (req) {
    token = req.headers.cookie ? req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") : cookies.get('token')
  }

  try {
    const isAuth = await api('GET', "auth", {}, token)
    if(isAuth.status === 401){
      new Error('Not authorized')
      await res.writeHead(302, {
        Location: '/'
      })
      await res.end()
    }
  } catch (err) {
    console.log('err? ',err)
    if (res) {
      await res.writeHead(302, {
        Location: '/'
      })
      await res.end()
    }
  }

}