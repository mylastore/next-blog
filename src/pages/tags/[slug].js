import Layout from "../../components/Layout"
import {api} from '../../actions/api'
import Card from "../../components/auth/blog/Card"
import Head from "next/head"
import {APP_NAME, DOMAIN, FACEBOOK_ID, IMG} from "../../config"

const Slug = ({blogs, tag, error, query}) => {

  const head = () => (
    <Head>
      <title>{tag.name} | {APP_NAME}</title>
      <meta name="description" content={`Programing blogs and tutorials on ${tag.name}`}/>
      <link rel="canonical" href={`${DOMAIN}/tags/${query.tag}`}/>
      <meta property="og:title" content={`{${tag.name} | ${APP_NAME}`}/>
      <meta property="og:description" content={`Programing blogs and tutorials on ${tag.name}`}/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={`${DOMAIN}/tags/${query.slug}`}/>
      <meta property="og:site_name" content={`${APP_NAME}`}/>
      <meta property="og:image" content={`${IMG}/seo-img.png`}/>
      <meta property="og:image:secure_url" content={`${IMG}/seo-img.png`}/>
      <meta property="og:image:type" content="image/png"/>
      <meta property="fb:app_id" content={`${FACEBOOK_ID}`}/>
    </Head>
  )

  return (
    error ?
      <>
        <Layout>
          <div className="container">
            <div className="alert alert-danger mt-3">
              {error}
            </div>
          </div>
        </Layout>
      </>
      :
      <>
        <Layout>
          {head()}
          <div className="container">
            <section>
              <div className="row">
                <div className="col-md-9">
                  <h1>Tag: <span className={'btn btn-outline-primary'}>{tag.name}</span></h1>
                  {blogs.map((b, i) => (
                    <Card key={i} b={b}/>
                  ))}
                </div>
                <div className="col-md-3">

                </div>
              </div>
            </section>
          </div>
        </Layout>
      </>
  )

}

export async function getServerSideProps({query}) {
  try {
    const res = await api('GET', `tag/${query.slug}`)
    if (res.status >= 400) {
      return {
        props: {
          error: res.message
        }
      }
    }
    return {
      props: {
        blogs: res.blogs,
        tag: res.tag,
        query
      }
    }
  } catch (err) {
    return {
      props: {
        error: err.message
      }
    }
  }

}

export default Slug
