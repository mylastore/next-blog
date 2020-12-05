import React, {useEffect, useState} from 'react'
import {api} from '../actions/api'
import Cookie from 'js-cookie'
import {handleAuthSSR} from '../actions/authSSR'
import Layout from "../components/Layout"
import parseCookies from '../helpers/parseCookies'
import Router from "next/router";

const secretPage = ({serverCookie}) => {

  const [token, setToken] = useState(()=> {
    return serverCookie
  });
  const [ping, setPing] = useState('Ping')

  useEffect(()=>{
    Cookie.set('token', JSON.stringify(token))
  }, [token])


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

export async function getServerSideProps({req, res}) {
  const cookies = parseCookies(req)
  console.log(cookies.token)

  await handleAuthSSR(req, res)
  return {props:{
    serverCookie: cookies.token
  }}
}


export default secretPage;