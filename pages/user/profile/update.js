import Layout from "../../../components/Layout"
import UserComponent from "../../../components/user/UserComponent"
import {useEffect, useState} from "react"
import {authenticate, getCookie,getCookieAsJSON, isAuth} from "../../../actions/auth"
import {api} from "../../../actions/api"

const updateProfile = () => {
  let currentUser

  if (process.browser){
    currentUser = isAuth()
  }

  //const user = getCookieAsJSON('rememberMe')

  const[passwordValues, setPasswordState] = useState({
    password: '',
    confirm: '',
    match: false,
    message: 'Password did not match.'
  })
  const {password, confirm, message, match} = passwordValues

  const [values, setValues] = useState({
    username: '',
    name: '',
    email: '',
    about: '',
    location: '',
    website: '',
    avatar: ''
  })

  const {username, name, email, about, location, website} = values

  useEffect(() => {
    (async ()=>{
      await getUser()
    })()
  }, [])

  const getUser = async () => {
    try{
      const res = await api('GET', `user/profile/${currentUser.username}`, {}, getCookie('token'))
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setValues({
        ...values,
        username: res.username,
        name: res.name,
        email: res.email,
        location: res.location,
        website: res.website,
        avatar: res.avatar,
        about: res.about
      })
      //return authenticate(res, () => {})

    }catch(err){
      return flash(err.message, 'danger')
    }
  }

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const currentUserName = isAuth().username
    const userData = { username, name, email, about, location, website }

    try{
      const res = await api('PATCH', `user/account/${currentUserName}`, userData, getCookie('token'))
      if(res.status >= 400){
        window.scrollTo(500, 0);
        return flash(res.message, 'danger')
      }
      flash('User updated!', 'success')
      window.scrollTo(500, 0);
      setValues({
        ...values,
        username: res.username,
        name: res.name,
        email: res.email,
        website: res.website,
        location: res.location,
        about: res.about
      })
    }catch(err){
      window.scrollTo(500, 0);
      return flash(err.message, 'danger')
    }

  }

  const passwordSubmit = async (e) => {
    e.preventDefault()
    const data = {
      _id: isAuth()._id,
      password
    }
    try{
      const res = await api('POST', 'user/update-password', data, getCookie('token'))
      if(res.status !== 200){
        return flash(res.message, 'warning' )
      }
      setPasswordState({...passwordValues, password: '', confirm: ''})
      return flash(res.message, 'success' )

    } catch (err){
      window.scrollTo(500, 0);
      return flash(err.message, 'warning')
    }

  }

  const handlePasswordChange = name => e => {
    let value = e.target.value
    let isMatch
    if(name === 'confirm'){
      isMatch = value === password
    }

    setPasswordState({ ...passwordValues, [name]: value, match: isMatch })
  }

  const form = () => (
    <form className="mt-4" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="text-muted">Username</label>
        <input onChange={handleChange('username')} type="text" value={username} className="form-control" />
        <small id="usernameHelp" className="form-text text-muted">
          Password minimum length 8, must have 1 capital letter, 1 number and 1 special character.
        </small>
      </div>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input onChange={handleChange('name')} type="text" value={name} className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input type="email" value={email} className="form-control" disabled/>
        <small id="usernameHelp" className="form-text text-muted">
          Emails can't be change.
        </small>
      </div>
      <div className="form-group">
        <label className="text-muted">Location</label>
        <input onChange={handleChange('location')} type="text" value={location} className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">Website</label>
        <input onChange={handleChange('website')} type="text" value={website} className="form-control" />
      </div>
      <div className="form-group">
        <label className="text-muted">About</label>
        <textarea onChange={handleChange('about')} type="text" value={about} className="form-control" />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </div>
    </form>
  )

  const passwordForm = () => (
    <form className="mt-4" onSubmit={passwordSubmit}>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input onChange={handlePasswordChange('password')} type="password" value={password} className="form-control" />
        <small id="usernameHelp" className="form-text text-muted">Password must be at least 6 characters and must contain 1 uppercase and 1 symbol.</small>
      </div>
      <div className="form-group">
        <label className="text-muted">Confirm Password</label>
        <input onChange={handlePasswordChange('confirm')} type="password" value={confirm} className="form-control" />
        {password !== confirm && confirm !== '' && (
          <div className="mt-3 alert alert-warning" role="alert">
            {message}
          </div>
        )}

      </div>
      <div>
        <button type="submit" className="btn btn-primary" disabled={!match}>
          Update Password
        </button>
      </div>
    </form>
  )

  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <UserComponent>
            <h2>User Update</h2>
            <div className="row">
              <div className="col-md-8">
                {form()}
              </div>
              <div className="col-md-4">
                {passwordForm()}
              </div>
            </div>

          </UserComponent>
        </div>
      </section>
    </Layout>
  )
}

export default updateProfile