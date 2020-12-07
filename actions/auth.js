import cookie from 'js-cookie'

// export const handleSession = (res) => {
//   if (res.status === 440) {
//     flash('Session has expired.', 'danger')
//     logout()
//     setTimeout(()=>{
//       window.location.replace('/')
//     }, 1000)
//   }
// }

export const logout = () => {
  removeCookie('token')
  removeCookie('rememberMe')
}

export const setCookie = async (key, value) => {
  if (process.browser) {
    await cookie.set(key, value, {expires: 7})
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key)
  }
}

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key)
  }
}

export const getCookieAsJSON = (key) => {
  if (process.browser) {
    return cookie.getJSON(key)
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
      if (getCookie('rememberMe')) {
        return getCookieAsJSON('rememberMe')
      }
    }
    return false
  }
}
