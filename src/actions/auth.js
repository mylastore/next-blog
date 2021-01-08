import Cookies from 'js-cookie'

export const handleSession = async (res) => {
  if (res.status === 440) {
    await logout()
    setTimeout(()=>{
      window.location.replace('/')
      alert("Session has expired.")
    }, 1000)
  }
}

export const logout = async () => {
  await removeCookie('token')
  await removeCookie('rememberMe')
}

export const updateCookie = async (key, value) => {
  if (process.browser) {
    await Cookies.remove(key)
    await Cookies.set(key, value, {expires: 7})
  }
}

export const setCookie = async (key, value) => {
  if (process.browser) {
    await Cookies.set(key, value, {expires: 7, sameSite: 'lax'})
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
