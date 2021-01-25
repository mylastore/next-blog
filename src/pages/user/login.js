import Layout from "../../components/Layout"
import {useContext} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {api} from '../../actions/api'
import GoogleLoginComponent from "../../components/auth/GoogleLoginComponent"
import {authenticate} from '../../actions/auth/auth'
import {UserContext} from "../../components/context/UserContext"
import isAuth from "../../actions/auth/isAuth"
import {LoginSchema} from "../../actions/schemas"
import{Form, Formik} from 'formik'
import {FormInput} from "../../components/Form"

const Login = () => {
  const {setUser} = useContext(UserContext)

  const handleSubmit = async (values) => {
    try {
      const res = await api('POST', 'user/login', values)
      if (res && res.status >= 400) {
        return flash(res.message, 'danger')
      }
      await authenticate(res)
      delete res['token']
      setUser(res)
      await Router.push(`/public/${res.username}`)
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <div>
              <h1 className="p-3">Login Form</h1>
              <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={LoginSchema}
                onSubmit={async (values, actions) => {
                  await handleSubmit(values)
                  actions.resetForm({
                    values: {email: '', password: ''}
                  })
                }}
              >
                <Form>
                  <FormInput name="email" type="email" label="Email"/>
                  <FormInput name="password" type="password" label="Password"/>
                  <button type={'submit'} className="btn btn-block btn-primary mb-4">Login</button>
                  <p className="text-center">or</p>
                  {GoogleLoginComponent()}
                </Form>
              </Formik>
              <p className="clearfix">&nbsp;</p>
              <small id="emailHelp" className="form-text text-center text-muted">
                Don't have an account? Please <Link href="/user/register"><a>register.</a></Link></small>
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
  //checks if user is login
  return await isAuth(req)
}

export default Login
