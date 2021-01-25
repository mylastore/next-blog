import {PRODUCTION} from "../../config"
import Cookies from 'js-cookie'

export const handleSession = async (res) => {
  if (res.status === 440) {
    await logout()
  }
}

export const logout = async () => {
  await removeCookie('token')
  await removeCookie('rememberMe')
}

export const setCookie = async (key, value) => {
  console.log(key)
  console.log(PRODUCTION)

  if (process.browser) {
    if(key === 'token' && PRODUCTION){
      await Cookies.set(key, value, {expires: 7, sameSite: 'lax', secure: true})
    }
    if(key === 'rememberMe') {
      await Cookies.set(key, value, {expires: 7, sameSite: 'lax'})
    }
  }
}

export const removeCookie = async (key) => {
  if (process.browser) {
    await Cookies.remove(key)
  }
}

export const getCookie = (key) => {
  if (process.browser) {
    return Cookies.get(key)
  }
}

export const getCookieAsJSON = (key) => {
  if (process.browser) {
    return Cookies.getJSON(key)
  }
}

export const authenticate = async (data) => {
  await setCookie('token', data.token)
}

export const isAuth = () => {
  if (process.browser) {
    if (getCookie('token')) {
      return getCookieAsJSON('rememberMe')
    }
    return false
  }
}