import Layout from "../../components/Layout"
import {useContext} from 'react'
import Link from 'next/link'
import Router from 'next/router'
import {api} from '../../actions/api'
import GoogleLoginComponent from "../../components/auth/GoogleLoginComponent"
import {setToken} from '../../actions/auth/auth'
import {UserContext} from "../../components/context/UserContext"
import isAuth from "../../actions/auth/isAuth"
import {LoginSchema} from "../../actions/schemas"
import{Form, Formik} from 'formik'
import {FormInput} from "../../components/Form"

const Login = () => {
  const {setUser} = useContext(UserContext)
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
                  try {
                    const res = await api('POST', 'user/login', values)
                    if (res && res.status >= 400) {
                      return flash(res.message, 'danger')
                    }
                    await setToken(res.token)
                    // wait to setToken before deleting it
                    setTimeout(async ()=>{
                      delete await res['token']
                      setUser(res)
                      Router.push(`/public/${res.username}`)
                    }, 200)
                  } catch (err) {
                    return flash(err.message, 'danger')
                  }
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
                  <GoogleLoginComponent />
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
