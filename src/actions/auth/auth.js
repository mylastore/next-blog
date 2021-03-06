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

export const setToken = async (value) => {
  await Cookies.set('token', value, {expires: 7, sameSite: 'lax'})
}

export const setCookie = async (value) => {
  await Cookies.set('rememberMe', value, {expires: 7, sameSite: 'lax'})
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

export const isAuth = () => {
  if (process.browser) {
    if (getCookie('token')) {
      return getCookieAsJSON('rememberMe')
    }
    return false
  }
}
