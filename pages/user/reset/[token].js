import {useState} from 'react'
import {api} from "../../../actions/api"
import Layout from "../../../components/Layout"
import {withRouter} from "next/router"
import parseCookies from "../../../helpers/parseCookies";

const resetPassword = ({router}) => {
  const [values, setValues] = useState({
    password: '',
    passwordConfirm: '',
    match: false,
    message: 'Password did not match.'
  })
  const {password, passwordConfirm, message, match} = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      password: password,
      passwordResetToken: router.query.token
    }
    try{
      const res = await api('POST', 'user/reset-password', data)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setValues({...values, password: '', passwordConfirm: ''})
      setTimeout(() => {
        return flash('Success! Please login.', 'success')
      }, 500)
    }catch (err){
      return flash(err.message, 'danger')
    }
  }

  const handleChange = name => e => {
    let value = e.target.value
    let isMatch
    if(name === 'passwordConfirm'){
      isMatch = value === password
    }
    setValues({...values, [name]: value, match: isMatch})
  }

  const resetPasswordForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Enter Your New Password</label>
        <input type="password" onChange={handleChange('password')} className="form-control" value={password} required/>
      </div>
      <div className="form-group">
        <label>Confirm Your New Password</label>
        <input type="password" onChange={handleChange('passwordConfirm')} className="form-control" value={passwordConfirm} required/>
        {password !== passwordConfirm && passwordConfirm !== '' && (
          <div className="mt-3 alert alert-warning" role="alert">
            {message}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-primary" disabled={!match}>Send</button>
    </form>
  )

  return (
    <Layout>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 offset-3">
            <h4>Password Reset Form</h4>
            <hr/>
            {resetPasswordForm()}
          </div>
        </div>

      </div>
    </Layout>
  )

}

export async function getServerSideProps({req}) {
  const cookies = parseCookies(req)
  if (cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {}
    }
  } else {
    return {
      props: {}
    }
  }
}

export default withRouter(resetPassword)