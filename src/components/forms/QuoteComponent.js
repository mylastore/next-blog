import {api} from "../../actions/api"
import {Form, Formik} from 'formik'
import {SupportSchema} from "../../actions/schemas"
import {FormInput, FormTextArea} from "../Form"

const QuoteComponent = () => {

  const handleSubmit = async values => {
    try {
      const res = await api('POST', 'admin/quote', values)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      return flash(res.message, 'success')
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  return (
    <Formik
      initialValues={{name: '', email: '', phone: '', website: '', message: ''}}
      validationSchema={SupportSchema}
      onSubmit={async (values, actions) => {
        await handleSubmit(values)
        actions.resetForm({
          values: {name: '', email: '', phone: '', website: '', message: ''}
        })
      }}
    >
      <Form>
        <FormInput name="name" type="name" label="Name"/>
        <FormInput name="email" type="email" label="Email"/>
        <FormInput name="phone" type="text" label="Phone"/>
        <FormInput name="website" type="text" label="Website"/>
        <FormTextArea name="message" label="Message" />
        <button type="submit" className={'btn btn-primary'}>Send</button>
      </Form>
    </Formik>
  )

}

export default QuoteComponent
