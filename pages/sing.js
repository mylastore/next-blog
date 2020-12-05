import Layout from "../components/Layout"
import { Cookies } from 'react-cookie'
import {api} from '../actions/api'
import Router from "next/router";

const cookies = new Cookies()

const singIn = () =>{

  const onLoginClick = async () => {
    const data = {
      email: 'me@me.com',
      password: 'Password#1'
    }
    const res = await api('POST', 'user/login', data)
    cookies.set('token', res.token);
    await Router.push(`/secret`)
  }

  return (
    <Layout>
      <section>
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <h2>Sing In</h2>
            <button className={'btn btn-primary'} onClick={onLoginClick}>Sing In</button>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default singIn