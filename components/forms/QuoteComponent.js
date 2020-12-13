import {useState} from "react"
import {api} from "../../actions/api"

const QuoteComponent = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    message: '',
    phone: '',
    company: ''
  })
  const {name, email, message, phone, company} = values

  const submit = async e => {
    e.preventDefault()
    const data = {
      name: name,
      email: email,
      message: message,
      phone: phone,
      company: company
    }
    try{
      const res = await  api('POST', 'admin/quote', data)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setValues({...values, name: '', email: '', phone: '', company: '', message: ''})
      return flash(res.message, 'success')
    }catch(err){
      return flash(err.message, 'danger')
    }
  }

  const handleChange = name => e => {
    setValues({
      ...values,
      [name]: e.target.value
    })
  }

  const quoteForm = () => {
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
          <label>Phone</label>
          <input
            type="tel"
            onChange={handleChange('phone')}
            className="form-control"
            value={phone}
          />
          <small className="form-text text-muted">Optional</small>
        </div>
        <div className="form-group">
          <label>Company</label>
          <input
            type="text"
            onChange={handleChange('company')}
            className="form-control"
            value={company}
          />
          <small className="form-text text-muted">Optional</small>
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
        <button className="btn btn-primary">Send Form</button>

      </form>
    )
  }

  return (
    <div>
      {quoteForm()}
    </div>
  )

}

export default QuoteComponent