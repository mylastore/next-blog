import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import 'react-quill/dist/quill.snow.css'
import {useEffect} from "react"
import Bus from "../helpers/bus"
import {APP_NAME} from "../config"

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
      <Component {...pageProps} />
    </>
  )

}


