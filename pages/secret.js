import React, {useState} from 'react'
import {api} from '../actions/api'
import Layout from "../components/Layout"
import parseCookies from '../helpers/parseCookies'

const secretPage = ({token}) => {
  const [ping, setPing] = useState('Ping')

  const onPingCall = async (e) => {
    try {
      const res = await api('GET', 'ping', {}, token);
      return setPing(res.message)

    } catch (err) {
      return console.log(err);
    }
  }

  return (
    <Layout>
      <div className="container">
        <h2>Secret Page</h2>
        <p>Only accessible via a valid JWT</p>
        <button className={'btn btn-primary'} onClick={onPingCall}>Ping Call</button>
        <div className="alert alert-warning mt-3">
          {ping}
        </div>
      </div>
    </Layout>
  )
}


export async function getServerSideProps({req}) {
  const cookies = parseCookies(req)
  if (cookies.token) {
    return {
      props: {
        token: cookies.token
      }
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {
        token: null
      }
    }
  }
}

export default secretPage