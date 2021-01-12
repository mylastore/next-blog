import {useField} from "formik"

export const FormInput = ({label, helper, ...props}) => {
  const [field, meta] = useField(props)

  return (
    <div className={'form-group'}>
      <label>{label || props.placeholder}</label>
      <input className={'form-control'} {...field} {...props} />
      {helper ?
        <small id="usernameHelp" className="form-text text-muted">
          {helper}
        </small>
       : null }
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
      <input className="form-check-input" type="checkbox" id={props.id} {...field} {...props} />
      <label className="checkbox" for={props.id}>
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
      <label for={props.id || props.name} aria-label={props.id || props.name}>{label}</label>
      <select className={'form-select'} {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
