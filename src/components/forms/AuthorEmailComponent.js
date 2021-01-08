import {api} from "../../actions/api"
import {Formik, Form} from 'formik'
import * as Yup from "yup"
import {FormInput, FormTextArea} from "../Form"

const EmailAuthorSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),

  message: Yup.string()
    .min(2, 'Too Short!')
    .max(800, 'Too Long!')
    .required('Required'),

  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});


const AuthorEmailComponent = ({authorEmail, authorUserName}) => {

  const submit = async values => {
    try {
      const res = await api('POST', 'contact-author', values)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
     return flash(res.message, 'success')
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  return (
    <div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
          authorEmail: authorEmail
        }}

        validationSchema={EmailAuthorSchema}

        onSubmit={async (values, actions) => {
          await submit(values)
          actions.resetForm({
            values: {name: '', email: '', message: ''}
          })
        }}
      >
        <Form>
          <FormInput name="name" type="text" label="Name"/>
          <FormInput name="email" type="email" label="Email"/>
          <FormTextArea name="message" label="Message"/>
          <button type="submit" className={'btn btn-primary'}>Message {authorUserName}</button>
        </Form>
      </Formik>
    </div>
  )

}

export default AuthorEmailComponent
