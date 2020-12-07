import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {api} from '../../actions/api'
import GoogleLoginComponent from "./GoogleLoginComponent"
import {UserContext} from '../context/UserContext'
import {Cookies} from "react-cookie"
import Cookie from 'js-cookie'
import parseCookies from "../../helpers/parseCookies";

const cookies = new Cookies()

const LoginComponent = ({initialRememberValue}) => {
  // const { user, storeUser } = useContext(UserContext)

  const [rememberMe, setRememberMe] = useState(initialRememberValue)

  useEffect(() => {
    Cookie.set('rememberMe', JSON.stringify(rememberMe))
  }, [rememberMe])

  const [values, setValues] = useState({
    email: 'me@me.com',
    password: 'Password#1',
    loading: false,
    showForm: true
  })

  const {email, password, loading, showForm} = values


  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({...values, loading: true})
    const data = {email, password}

    try {
      const res = await api('POST', 'user/login', data)
      if (res && res.status >= 400) {
        setValues({...values, loading: false})
        return flash(res.message, 'danger')
      }
      setValues({...values, email: '', password: '', loading: false})
      cookies.set('token', res.token, {maxAge: 86400})

      delete res["token"]
      await setRememberMe(res)
      //await storeUser(res)
      await Router.push(`/secret`)
      //return Router.push(`/public/${username}`)
    } catch (err) {
      setValues({...values, loading: false})
      return flash(err.message, 'danger')
    }

  }

  const handleChange = name => e => {
    setValues({...values, [name]: e.target.value})
  }

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')

  const loginForm = () => {
    return (
      <div>
        <h1 className="p-3">Login Form {rememberMe}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="email" onChange={handleChange('email')} className="form-control" value={email}
                   placeholder="Enter your email"/>
          </div>
          <div className="form-group">
            <input type="password" onChange={handleChange('password')} className="form-control" value={password}
                   placeholder="Enter your password"/>
          </div>
          <button className="btn btn-block btn-primary mb-4">Login</button>
          <p className="text-center">or</p>

          {GoogleLoginComponent()}
        </form>
        <p className="clearfix">&nbsp;</p>
        <small id="emailHelp" className="form-text text-center text-muted">
          Don't have an account? Please <Link href="/register"><a>register.</a></Link></small>
      </div>
    )
  }

  return (
    <div>
      {showLoading()}
      {showForm && loginForm()}
      <div className="text-center mt-5">
        <Link href={'/user/forgot'}>
          <a>Forgot Password</a>
        </Link>
      </div>
    </div>
  )

}


export default LoginComponent