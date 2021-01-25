import {api} from "../../../actions/api"
import Layout from "../../../components/Layout"
import {withRouter} from "next/router"
import isAuth from "../../../actions/auth/isAuth"
import {Form, Formik} from "formik"
import {ResetPasswordSchema} from "../../../actions/schemas"
import {FormInput} from "../../../components/Form"

const resetPassword = ({router}) => {
  const handleSubmit = async (values) => {
    const data = {
      password: values.password,
      passwordResetToken: router.query.token
    }
    try {
      const res = await api('POST', 'user/reset-password', data)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setTimeout(() => {
        return flash('Success! Please login.', 'success')
      }, 500)
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 offset-3">
            <h4>Password Reset Form</h4>
            <hr/>
            <Formik
              initialValues={{password: '', passwordConfirm: ''}}
              validationSchema={ResetPasswordSchema}
              onSubmit={async (values, actions) => {
                await handleSubmit(values)
                actions.resetForm({
                  values: {password: '', passwordConfirm: ''}
                })
              }}
            >
              <Form>
                <FormInput name="password" type="password" label="Password"/>
                <FormInput name="passwordConfirm" type="password" label="Confirm Password" helper="Password minimum length 8, must have 1 capital
                  letter, 1 number and 1 special character"/>
                <button type="submit" className={'btn btn-primary'}>Send</button>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  //checks if user is login
  return await isAuth(req)
}

export default withRouter(resetPassword)
