import {useState} from 'react'
import Link from 'next/link'
import {api} from '../../actions/api'
import {RegisterSchema} from "../../actions/schemas"
import {Form, Formik} from 'formik'
import {FormInput} from "../Form"

const RegisterComponent = () => {
  const [form, setForm] = useState({
    message: '',
    showForm: true,
    showMessage: false
  })

  const { showForm, message, showMessage} = form

  const handleSubmit = async (values) => {
    try{
      const res = await api('POST', 'user/account-activation', values)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setForm({...values, message: res.message, showMessage: true, showForm: false})
    }catch (err){
      return flash(err.message, 'danger')
    }
  }

  const registerForm = () => {
    return (
      <div>
        <h1 className="p-3">Register</h1>
        <Formik
          initialValues={{email: ''}}
          validationSchema={RegisterSchema}
          onSubmit={async (values, actions) => {
            await handleSubmit(values)
            actions.resetForm({
              values: {name: '', email: '', password: ''}
            })
          }}
        >
          <Form>
            <FormInput name="name" type="text" label="Name"/>
            <FormInput name="email" type="email" label="Email"/>
            <FormInput name="password" type="password" label="Password"/>
            <small id="emailHelp" className="form-text text-muted">Password minimum length 8, must have 1 capital
              letter, 1 number and 1 special character.
            </small>
            <button type={'submit'} className="btn btn-block btn-primary mt-3 mb-2">Register</button>
          </Form>
        </Formik>

        <div className="clearfix"> </div>
        <small id="emailHelp" className="form-text text-muted">Already register, please <Link
          href="/user/login"><a>login.</a></Link>
        </small>
      </div>
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
      {showForm && registerForm()}
      {showMessage && success()}
    </>
  )

}

export default RegisterComponent
