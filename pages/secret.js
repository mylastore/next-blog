import React, {useState} from 'react'
import {api} from '../actions/api'
import {Cookies} from 'react-cookie'
import {handleAuthSSR} from '../actions/authSSR'
import Layout from "../components/Layout"

const secretPage = ({}) => {

  const [ping, setPing] = useState('Ping')
  const cookies = new Cookies();

  const onPingCall = async (e) => {
    const token = cookies.get('token')

    try {
      const res = await api('GET', 'ping', {}, token);
      return setPing(res.message)
    } catch (err) {
      return console.log(err);
    }
  }

  return (
    <Layout>
    <div className={'container'}>
      <h2>Secret page</h2>
      <p>Only accessible via a valid JWT</p>
      <button className={'btn btn-primary'} onClick={onPingCall}>Ping Call</button>
      <div className="alert alert-warning mt-3">
      {ping}
      </div>
    </div>
    </Layout>
  )

}

export async function getServerSideProps(ctx) {
  if (!ctx.req.headers.cookie) {
    ctx.res.statusCode = 302
    ctx.res.setHeader('Location', `/singin`)
    return {props: {}}
  }
  await handleAuthSSR(ctx)
  return {props:{}}
}


export default secretPage;