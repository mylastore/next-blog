import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import {useEffect} from "react"
import Bus from "../actions/bus"
import {APP_NAME} from "../config.js"
import UserContextProvider from "../components/context/UserContext";

export default function App({Component, pageProps}) {

  useEffect(() => {
    window.flash = (message, type = "danger") => Bus.emit('flash', ({message, type}))
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Programming blogs | {APP_NAME}</title>
      </Head>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </>
  )

}


