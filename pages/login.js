import Layout from "../components/Layout"
import {useContext, useEffect, useState} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {api} from '../actions/api'
import GoogleLoginComponent from "../components/auth/GoogleLoginComponent"
import {authenticate} from '../actions/auth'
import parseCookies from "../helpers/parseCookies"
import {UserContext} from "../components/context/UserContext";


const Login = () => {
 const {setUser} = useContext(UserContext)

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

      await authenticate(res, ()=>{})
      delete res['token']
      setUser(res)

      await Router.push(`/public/${res.username}`)
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
        <h1 className="p-3">Login Form</h1>
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
    <Layout>
      <section>
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <div>
              {showLoading()}
              {showForm && loginForm()}
              <div className="text-center mt-5">
                <Link href={'/user/forgot'}>
                  <a>Forgot Password</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  const cookies = parseCookies(req)
  if (cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      }
    }
  } else {
    return {
      props: {}
    }
  }
}

export default Login