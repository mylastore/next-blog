import Layout from "../../components/Layout"
import {useState} from 'react'
import {api} from '../../actions/api'
import parseCookies from "../../helpers/parseCookies";

const forgotPassword = () => {

  const [values, setValues] = useState({
    email: ''
  })
  const {email} = values

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api('POST', 'user/forgot', {email})
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setValues({...values, email: ''})
      return flash(res.message, 'success')

    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const handleChange = (e) => {
    setValues({...values, email: e.target.value})
  }

  const forgotPasswordForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Enter your email</label>
        <input type="email" className="form-control" onChange={handleChange} value={email}
               placeholder="enter your email here" required/>
      </div>
      <button className="btn btn-primary">Send</button>
    </form>
  )

  return (
    <Layout>
      <div className="container">
        <div className="row mt-5">
          <dev className="col-md-6 offset-md-3">
            <h4>Password Reset</h4>
            <hr/>
            {forgotPasswordForm()}
          </dev>
        </div>
      </div>
    </Layout>
  )

}

export async function getServerSideProps({req}) {
  const cookies = parseCookies(req)
  if (cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {}
    }
  } else {
    return {
      props: {}
    }
  }
}

export default forgotPassword