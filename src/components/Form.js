import {useField} from "formik"

export const FormInput = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <div className={'form-group'}>
      <label>{label || props.placeholder}</label>
      <input className={'form-control'} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error alert alert-danger mt-2">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const FormTextArea = ({label, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <div className={'form-group'}>
      <label>{label}</label>
      <textarea rows="4" className={'form-control'} {...field}>{props}</textarea>
      {meta.touched && meta.error ? (
        <div className="error alert alert-danger mt-2">{meta.error}</div>
      ) : null}
    </div>
  )
}

export const FormCheckbox = ({children, ...props}) => {
  const [field, meta] = useField({...props, type: 'checkbox'})
  return (
    <div className={'form-check'}>
      <input type="checkbox" id="flexCheckDefault" className="form-check-input" {...field} {...props} />
      <label className="checkbox" for="flexCheckDefault">
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="error alert alert-danger mt-2">{meta.error}</div>
      ) : null}
    </div>
  )
}

const FormSelect = ({label, ...props}) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name} aria-label={props.id || props.name}>{label}</label>
      <select className={'form-select'} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
