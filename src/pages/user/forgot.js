import Layout from "../../components/Layout"
import {api} from '../../actions/api'
import isAuth from "../../actions/auth/isAuth"
import {Form, Formik} from "formik";
import {FormInput} from "../../components/Form"
import {EmailSchema} from "../../actions/schemas";

const forgotPassword = () => {

  const submit = async (values) => {
    try {
      const res = await api('POST', 'user/forgot', values)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      return flash(res.message, 'success')

    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const forgotPasswordForm = () => (
      <Formik
        initialValues={{ email: '' }}
        validationSchema={EmailSchema}
        onSubmit={async (values, actions) => {
          await submit(values)
          actions.resetForm({
            values: {email: ''}
          })
        }}
      >
        <Form>
          <FormInput name="email" type="email" label="Email"/>
          <button type="submit" className={'btn btn-primary'}>Send</button>
        </Form>
      </Formik>
  )

  return (
    <Layout>
      <div className="container">
        <div className="row mt-5">
          <dev className="col-md-6 offset-md-3">
            <h4>Password Reset</h4>
            {forgotPasswordForm()}
          </dev>
        </div>
      </div>
    </Layout>
  )

}

export async function getServerSideProps({req}) {
  //below if user is login redirect him to home page
  return await isAuth(req)
}

export default forgotPassword
