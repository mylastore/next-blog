import Layout from "../../components/Layout"
import {api} from '../../actions/api'
import Card from "../../components/blog/Card"
import Head from "next/head"
import {APP_NAME, DOMAIN, FACEBOOK_ID, IMG} from "../../config"

const Category = ({blogs, category, message, query}) => {

  const head = () => (
    <Head>
      <title>{category.name} | {APP_NAME}</title>
      <meta name="description" content={`Programing blogs and tutorials on ${category.name}`}/>
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`}/>
      <meta property="og:title" content={`{${category.name} | ${APP_NAME}`}/>
      <meta property="og:description" content={`Programing blogs and tutorials on ${category.name}`}/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`}/>
      <meta property="og:site_name" content={`${APP_NAME}`}/>
      <meta property="og:image" content={`${IMG}/seo-img.png`}/>
      <meta property="og:image:secure_url" content={`${IMG}/seo-img.png`}/>
      <meta property="og:image:type" content="image/png"/>
      <meta property="fb:app_id" content={`${FACEBOOK_ID}`}/>
    </Head>
  )

  return (
    blogs === 'error' ?
      <>
        <Layout>
          <div className="container">
            <div className="alert alert-danger mt-3">
              {message}
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
              <h1>Category: <span className={'btn btn-primary'}>{category.name}</span></h1>
              {blogs.map((b, i) => (
                <Card key={i} b={b}/>
              ))}
            </section>
          </div>
        </Layout>
      </>
  )

}

export async function getServerSideProps({query}) {
  try {
    const res = await api('GET', `category/${query.slug}`)
    if (!res) {
      return {
        props: {
          blogs: 'error',
          message: 'Oops! Something is wrong. Try later.'
        }
      }
    }
    if (res.status >= 400) {
      return {
        props: {
          blogs: 'error',
          message: res.message
        }
      }
    }
    return {
      props: {
        blogs: res.blogs,
        category: res.category,
        query
      }
    }


  } catch (err) {
    return {
      props: {
        blogs: 'error',
        message: err.message
      }
    }
  }

}

export default Category