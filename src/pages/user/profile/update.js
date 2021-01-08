import Layout from "../../../components/Layout"
import {useContext, useEffect, useState} from "react"
import {api} from "../../../actions/api"
import {UserContext} from "../../../components/context/UserContext"
import AuthComponent from "../../../components/auth/AuthComponent"
import handleAuthSSR from "../../../actions/authSSR"
import {logout} from "../../../actions/auth"
import Router from "next/router"
import {Form, Formik} from 'formik'
import {FormInput, FormTextArea} from '../../../components/Form'
import {ResetPasswordSchema, UserUpdateSchema} from "../../../actions/schemas"

const updateProfile = ({token}) => {
  const {user, setUser} = useContext(UserContext)

  const [userValues, setUserValues] = useState({
    username: '',
    name: '',
    email: '',
    about: '',
    location: '',
    website: ''
  })

  const {username, name, email, about, location, website} = userValues

  useEffect(() => {
    (async () => {
      if (user) {
        await getUser()
      }
    })()
  }, [user])

  const getUser = async () => {
    try {
      const res = await api('GET', `user/profile/${user.username}`, {}, token)
      console.log(res)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      return setUserValues({
        ...userValues,
        username: res.username,
        name: res.name,
        email: res.email,
        location: res.location,
        website: res.website,
        avatar: res.avatar,
        about: res.about
      })
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }



  const handleSubmit = async (values) => {
    try {
      const res = await api('PATCH', `user/account/${user.username}`, values, token)
      if (res.status >= 400) {
        window.scrollTo(500, 0);
        return flash(res.message, 'danger')
      }
      flash('User updated!', 'success')
      window.scrollTo(500, 0);
      setUserValues({
        ...userValues,
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
    } catch (err) {
      window.scrollTo(500, 0);
      return flash(err.message, 'danger')
    }
  }

  const passwordSubmit = async (values) => {
    const data = {
      _id: user._id,
      password: values.password
    }

    try {
      const res = await api('POST', 'user/update-password', data, token)
      if (res.status !== 200) {
        return flash(res.message, 'warning')
      }
      return flash(res.message, 'success')
    } catch (err) {
      window.scrollTo(500, 0);
      return flash(err.message, 'warning')
    }

  }

  const form = () => (
    <Formik
      enableReinitialize={true}
      initialValues={{username: username, name: name, email: email, location: location, website: website, about: about}}
      validationSchema={UserUpdateSchema}
      onSubmit={async (values) => {
        await handleSubmit(values)
      }}
    >
      <Form>
        <FormInput name="username" type="text" label="Username" helper="Username must be unique, no spaces and camelcase is permitted"/>
        <FormInput name="name" type="text" label="Name"/>
        <FormInput
          className="text-muted form-control"
          value={email}
          name="email"
          type="email"
          label="Email"
          helper="Email can't be change."
          disabled
        />
        <FormInput name="location" type="text" label="Location"/>
        <FormInput name="website" type="text" label="Website"/>
        <FormTextArea name="about" label="About" />
        <button type="submit" className={'btn btn-primary'}>Send</button>
      </Form>
    </Formik>
  )
  const handleDeleteAccount = async () => {
    const result = window.confirm("Are you sure you want to delete your account?")

    if(result){
      try {
        const res = await api('POST', `user/delete`, {_id: user._id}, token)
        console.log('res ',res)
        if (res.status >= 400) {
          window.scrollTo(500, 0);
          return flash(res.message, 'danger')
        }
        setUser(null)
        await logout()
        flash('User was deleted!', 'success')
        window.scrollTo(500, 0);
        return await Router.push('/')
      }catch (err){
        window.scrollTo(500, 0);
        return flash(err.message, 'danger')
      }
    }

  }

  const passwordForm = () => (
    <Formik
      initialValues={{password: '', passwordConfirm: ''}}
      validationSchema={ResetPasswordSchema}
      onSubmit={async (values, actions) => {
        await passwordSubmit(values)
        actions.resetForm({
          values: {password: '', passwordConfirm: ''}
        })
      }}
    >
      <Form>
        <FormInput name="password" type="password" label="Password" helper="Password must be at least 6 characters and must
          contain 1 uppercase and 1 symbol"/>
        <FormInput name="passwordConfirm" type="password" label="Confirm Password"/>
        <button type="submit" className={'btn btn-primary'}>Update Password</button>
      </Form>
    </Formik>
  )

  const deleteAccount = () => (
    <div className="form-group">
      <h5 className={"bold"}>Delete my account</h5>
      <hr/>
      <button onClick={handleDeleteAccount} className={'btn btn-danger'}>Delete Account</button>
      <small className="form-text text-muted">Before deleting your account you must delete all yours blogs.</small>
    </div>
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
                <div className={'mt-5'}>
                  {deleteAccount()}
                </div>
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
