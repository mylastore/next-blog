import Layout from '../../components/Layout'
import {api} from '../../actions/api'
import {useEffect, useState} from "react";

const getCode = ({code}) => {

  const [userAuthorizeToken, setUserAuthorizeToken] = useState('')

  useEffect(() => {
    (async () => {
      await getUserAccessToken()
    })()
  }, [])

  const getUserAccessToken = async () => {
    try {

      const res = await api('POST', 'insta', {code: code})
      if (res && res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setUserAuthorizeToken(res.token)
      return console.log('res ',res)

    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  return (
    code === '' ?
      <Layout>
        <div className="container">
          <div className="alert alert-danger mt-3">
            Something went wrong.
          </div>
        </div>
      </Layout>
      :
      <Layout>
        <section>
          <div className="container-fluid">
          <h1>GET token</h1>
            <label htmlFor="">CODE: </label>
              {JSON.stringify(code)}
          </div>
        </section>
      </Layout>
  )
}

export async function getServerSideProps({query, req}) {
  return {
    props: {
      code: query ? query.code : '',
    }
  }
}

export default getCode
