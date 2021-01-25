import {api} from "../../../actions/api"
import Layout from "../../../components/Layout"
import {withRouter} from "next/router"
import jwt from 'jsonwebtoken'
import {useEffect, useState} from "react"
import isAuth from "../../../actions/auth/isAuth";

const userActivation = ({router}) => {
  const [values, setValues] = useState({
    email: '',
    message: '',
    showForm: true,
    showMessage: false
  })
  const {email, message, showForm, showMessage} = values

  useEffect(() => {
    const token = router.query.token
    if (token) {
      const decoded = jwt.decode(token)
      setValues({...values, email: decoded.email})
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      token: router.query.token
    }

    try {
      const res = await api('POST', 'user/register', data)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      return setValues({...values, showForm: false, showMessage: true, message: res.message})
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const buttonForm = () => (
    <div>
      <h5>Activation account for {email}</h5>
      <hr/>
      <button onClick={handleSubmit} type="submit" className="btn btn-primary">Activate Account</button>
    </div>
  )

  const showMessageForm = () => (
    <div className="alert alert-success" role="alert">
      <strong>{message}</strong>
    </div>
  )

  return (
    <Layout>
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3 text-center">
            {showForm && buttonForm()}
            {showMessage && showMessageForm()}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  return await isAuth(req)
}

export default withRouter(userActivation)