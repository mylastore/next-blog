import {useState} from "react"
import {api} from "../../actions/api"

const AuthorEmailComponent = ({authorEmail, authorUserName}) => {
  const [values, setValues] = useState({
    message: '',
    name: '',
    email: ''
  })
  const {message, name, email} = values

  const submit = async e => {
    e.preventDefault()
    const data = {
      message,
      name,
      email,
      authorEmail
    }
    try{
      const res = await api('POST', 'contact-author', data)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setValues({...values, name: '', message: '', email: ''})
      return flash(res.message, 'success')
    }catch (err){
      return flash(err.message, 'danger')
    }
  }

  const handleChange = name => e => {
    setValues({
      ...values,
      [name]: e.target.value
    })
  }

  const messageForm = () => {
    return (
      <form onSubmit={submit} id="quoteForm">
        <div className="form-group">
          <label>Name</label>
          <input type="text" onChange={handleChange('name')} className="form-control" value={name} required/>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            onChange={handleChange('email')}
            className="form-control"
            value={email}
            required
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            onChange={handleChange('message')}
            className="form-control"
            value={message}
            required
            rows="4"
          > </textarea>
        </div>
        <button className="btn btn-primary">Message {authorUserName}</button>
      </form>
    )
  }

  return (
    <>
      {messageForm()}
    </>
  )

}

export default AuthorEmailComponent