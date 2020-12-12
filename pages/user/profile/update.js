import Layout from "../../../components/Layout"
import {useContext, useEffect, useState} from "react"
import {api} from "../../../actions/api"
import {UserContext} from "../../../components/context/UserContext";
import AuthComponent from "../../../components/auth/AuthComponent";
import handleAuthSSR from "../../../actions/authSSR";

const updateProfile = ({token}) => {
  const {user, setUser} = useContext(UserContext)

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
        if(user){
          await getUser()
        }
      })()
  }, [user])

  const getUser = async () => {
    try{
      const res = await api('GET', `user/profile/${user.username}`, {}, token)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      return setValues({
        ...values,
        username: res.username,
        name: res.name,
        email: res.email,
        location: res.location,
        website: res.website,
        avatar: res.avatar,
        about: res.about
      })
    }catch(err){
      return flash(err.message, 'danger')
    }
  }

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
       const userData = { username, name, email, about, location, website }

    try{
      const res = await api('PATCH', `user/account/${user.username}`, userData, token)
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
      const newData = {
        username: res.username,
        name: res.name,
        email: res.email,
        _id: res._id,
        avatar: res.avatar,
        role: res.role
      }
      return setUser(newData)
    }catch(err){
      window.scrollTo(500, 0);
      return flash(err.message, 'danger')
    }
  }

  const passwordSubmit = async (e) => {
    e.preventDefault()
    const data = {
      _id: user._id,
      password
    }
    try{
      const res = await api('POST', 'user/update-password', data, token)
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
          Username must be unique, no spaces. Camelcase is acceptable.
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
          <AuthComponent>
            <h2>User Update</h2>
            <div className="row">
              <div className="col-md-8">
                {form()}
              </div>
              <div className="col-md-4">
                {passwordForm()}
              </div>
            </div>

          </AuthComponent>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  return await handleAuthSSR(req)
}

export default updateProfile