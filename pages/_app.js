import 'bootstrap/dist/css/bootstrap.css'
import Head from 'next/head'
import '../styles/globals.css'
import 'nprogress/nprogress.css'
import 'react-quill/dist/quill.snow.css'
import {useEffect} from "react";
import Bus from "../helpers/bus";

export default function App({ Component, pageProps }) {

  useEffect(() => {
    window.flash = (message, type = "danger") => Bus.emit('flash', ({message, type}))
  }, [])

  return (
      <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Head>
      <Component {...pageProps} />
      </div>
  )
}
