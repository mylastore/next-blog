import Layout from '../../components/Layout'
import Head from 'next/head'
import {api} from '../../actions/api'
import {IMG, DOMAIN, APP_NAME, FACEBOOK_ID} from "../../config"
import timeAgo from "../../actions/timeAgo"
import {showCategories, showTags} from "../../components/auth/blog/CatsAndTags"
import {useState, useEffect} from 'react'
import SmallCard from "../../components/auth/blog/SmallCard"
import styles from '../../styles/blog.module.css'
import DisqusThread from "../../components/DisqusThread"
import Link from 'next/link'
import Image from 'next/image'

const singleBlog = ({b, message}) => {
  const head = () => (
    <Head>
      <title>{b.title}| {APP_NAME}</title>
      <meta name="description" content={b.metaDescription}/>
      <link rel="canonical" href={`${DOMAIN}/blog/${b.slug}`}/>
      <meta property="og:title" content={`${b.title} | ${APP_NAME}`}/>
      <meta property="og:description" content={b.metaDescription}/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={`${DOMAIN}/${b.slug}`}/>
      <meta property="og:site_name" content={`${APP_NAME}`}/>
      <meta property="og:image" content={`${IMG}/${b.avatar}`}/>
      <meta property="og:image:secure_url" content={`${IMG}/${b.avatar}`}/>
      <meta property="og:image:type" content="image/jpg"/>
      <meta property="fb:app_id" content={`${FACEBOOK_ID}`}/>
    </Head>
  )

  const [related, setRelated] = useState([])
  const data = {_id: b._id, categories: b.categories}

  useEffect(() => {
    (async () => {
      await loadRelated()
    })()
  }, [])

  const loadRelated = async () => {
    if (await b === 'error') {
      return null
    }
    try {
      const res = await api('POST', `blog/related`, data)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      return setRelated(res)
    } catch (err) {
      return flash(err.message, 'danger')
    }

  }

  const showDisqus = () => {
    return (
      <div>
        <DisqusThread id={b._id} title={b.title} path={`/blog/${b.slug}`}/>
      </div>
    )
  }

  const showRelatedBlogs = () => {
    return related.map((b, i) => (
      <div className="col-sm-4" key={i}>
        <article>
          <SmallCard b={b}/>
        </article>
      </div>
    ))
  }

  return (
    b === 'error' ?
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
        {head()}
        <Layout>
          <article>
            <div className="container">
              <section>
                <h1>{b.title}</h1>
                <div className="center mb-3">
                  <Image
                    className={`${styles.featuredImage} img img-fluid`}
                    src={`${IMG}/${b.avatar}`}
                    alt={b.title}
                    width={1080}
                    height={200}
                  />
                </div>
                <Link href={`/public/${b.postedBy.username}`}>
                  <a className="noLink">
                    <span className="mark small float-left">Written
                      by {b.postedBy.username} | {timeAgo(b.createdAt)}</span>
                    <span className={'mark small float-right'}>Viewed {b.visited} times</span>
                  </a>
                </Link>
              </section>
              <section>
                {showCategories(b)}
                {showTags(b)}
              </section>
              <section>
                <div className={styles.editorImg} dangerouslySetInnerHTML={{__html: b.content}}/>
              </section>
              {b &&
              <section>
                {showDisqus()}
              </section>
              }
              {related.length > 0 &&
              <section>
                <h4>Related Blogs</h4>
                <div className="row">
                  {showRelatedBlogs()}
                </div>
              </section>
              }

            </div>
            <style jsx>{`
        .center {
          margin: auto;
        }
      `}</style>
          </article>
        </Layout>
      </>
  )
}

export async function getServerSideProps({query}) {
  try {
    const response = await api('GET', `getblog/${query.slug}`)

    if (!response) {
      return {
        props: {
          b: 'error',
          message: 'Oops! Something is wrong. Please try later'
        }
      }
    }
    if (response.status >= 400) {
      return {
        props: {
          b: 'error',
          message: response.message
        }
      }
    }
    return {
      props: {
        b: response
      }
    }

  } catch (err) {
    return {
      props: {
        b: 'error',
        message: err.message
      }
    }
  }

}

export default singleBlog
