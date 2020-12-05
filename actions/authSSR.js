import {api} from './api'
import {Cookies} from 'react-cookie'

const cookies = new Cookies()

export async function handleAuthSSR(req, res) {
  let token

  if (req) {
    token = req.headers.cookie ? req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1") : cookies.get('token')
  }

  try {
    await api('GET', "auth", {}, token)
  } catch (err) {
    if (res) {
      res.writeHead(302, {
        Location: '/'
      })
      res.end()
    }
  }

}