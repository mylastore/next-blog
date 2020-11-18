import cookie from 'js-cookie'

export const handleSession = (res) => {
  if (res.status === 440) {
    flash('Session has expired.', 'danger')
    logout()
    setTimeout(()=>{
      window.location.replace('/')
    }, 1000)
  }
}

export const logout = () => {
  removeCookie('token')
  removeLocalStorage('user')
}

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {expires: 1, sameSite: 'strict'})
  }
}

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key)
  }
}

export const removeLocalStorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key)
  }
}

export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key)
  }
}

export const setLocalStorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const authenticate = (data, next) => {
  setCookie('token', data.token)
  setTimeout(() => {
    delete data['token']
    setLocalStorage('user', data)
    return next()
  }, 100)

}

export const isAuth = () => {
  if (process.browser) {
    if (getCookie('token')) {
      if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      }
    }
    return false
  }
}
