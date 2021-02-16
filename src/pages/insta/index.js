import Layout from "../../components/Layout";
import {api} from "../../actions/api";
import {useEffect, useState} from "react";


export default function Index(){
    const [URL, setURL] = useState('')

    useEffect(() => {
        (async () => {
            await getURL()
        })()
    }, [])

    const getURL = async () => {
        try {
            const res = await api('GET', 'insta')
            if (res && res.status >= 400) {
                return flash(res.message, 'danger')
            }
            setURL(res.url)

        } catch (err) {
            return flash(err.message, 'danger')
        }
    }

  return(
    <Layout>
      <div className="container">
        <section>
          <h1>My Instagram Feed</h1>
            <br/>
            {JSON.stringify(URL)}
            <br/>
            <a href={URL}>Authorize Instagram</a>
        </section>
      </div>
    </Layout>
  )
}