import Cookies from 'js-cookie'

// export const handleSession = (res) => {
//   if (res.status === 440) {
//     flash('Session has expired.', 'danger')
//     logout()
//     setTimeout(()=>{
//       window.location.replace('/')
//     }, 1000)
//   }
// }

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
    await Cookies.set(key, value, {expires: 7})
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

export const authenticate = async (data, next) => {
  await setCookie('token', data.token)
  delete data['token']
  await setCookie('rememberMe', data)
  return next()
}

export const isAuth = () => {
  if (process.browser) {
    if (getCookie('token')) {
      const user = getCookieAsJSON('rememberMe')
      return user
    }
    return false
  }
}
