import {useState, useEffect} from 'react'
import Link from 'next/link'
import {api} from '../../actions/api'

const RegisterComponent = () => {
  const [values, setValues] = useState({
    name: 'Tony Q',
    email: 'me@me.com',
    password: 'Password#1',
    message: '',
    loading: false,
    showForm: true,
    showMessage: false
  })

  const {name, email, password, loading, showForm, message, showMessage} = values

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues({...values, loading: true})
    const user = {name, email, password}
    try{
      const res = await api('POST', 'user/account-activation', user)
      if(res.status >= 400){
        setValues({...values, loading: false})
        return flash(res.message, 'danger')
      }
      setValues({...values, name: '', email: '', message: res.message, showMessage: true, password: '', loading: false, showForm: false})
    }catch (err){
      setValues({...values, loading: false})
      return flash(err.message, 'danger')
    }

  }

  const handleChange = name => e => {
    setValues({...values, [name]: e.target.value})
  }

  const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div> : '')

  const registerForm = () => {
    return (
      <>
        <h1 className="p-3">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" onChange={handleChange('name')} className="form-control" value={name}
                   placeholder="Enter your name"/>
          </div>
          <div className="form-group">
            <input type="email" onChange={handleChange('email')} className="form-control" value={email}
                   placeholder="Enter your email"/>
          </div>
          <div className="form-group">
            <input type="password" onChange={handleChange('password')} className="form-control" value={password}
                   placeholder="Enter your password"/>
            <small id="emailHelp" className="form-text text-muted">Password minimum length 8, must have 1 capital
              letter, 1 number and 1 special character.
            </small>

          </div>
          <button className="btn btn-block btn-primary">Register</button>
        </form>
        <div className="clearfix"> </div>
        <small id="emailHelp" className="form-text text-muted">Already register, please <Link
          href="/login"><a>login.</a></Link></small>

      </>
    )
  }

  const success = () => (
   <div className="row">
     <div className="col-md-6offset-4">
       <div className="alert alert-success" role="alert">
       <strong>{message}</strong>
       </div>
     </div>
   </div>

  )

  return (
    <>
      {showLoading()}
      {showForm && registerForm()}
      {showMessage && success()}
    </>
  )

}

export default RegisterComponent