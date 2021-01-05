import Layout from '../../components/Layout'
import Head from 'next/head'
import {api} from '../../actions/api'
import Card from '../../components/auth/blog/Card'
import Link from "next/link"
import {IMG, DOMAIN, APP_NAME, FACEBOOK_ID, LIMIT} from "../../config"
import {withRouter} from "next/router"
import {useState} from "react"

const Blog = ({blogs, message, categories, tags, size, limit, skip, router, total}) => {
  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta name="description" content="Programing blogs and tutorials on React, Svelte, Vue, SapperJS "/>
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
      <meta property="og:title" content={`Latest web development tutorials | ${APP_NAME}`}/>
      <meta property="og:description" content="Programing blogs and tutorials on React, Svelte, Vue, SapperJS "/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
      <meta property="og:site_name" content={`${APP_NAME}`}/>
      <meta property="og:image" content={`${IMG}/seo-img.png`}/>
      <meta property="og:image:secure_url" content={`${IMG}/seo-img.png`}/>
      <meta property="og:image:type" content="image/jpg"/>
      <meta property="fb:app_id" content={`${FACEBOOK_ID}`}/>
    </Head>
  )

  const [skipState, setSkip] = useState(skip)
  const [sizeState, setSize] = useState(size)
  const [loadedBlogs, setLoadedBlogs] = useState([])

  const loadMore = async () => {
    let toSkip = skipState + limit
    const data = {
      limit: limit,
      skip: toSkip
    }
    try {
      const res = await api('POST', 'blogs', data)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setLoadedBlogs([...loadedBlogs, ...res.blogs])
      setSize(res.size)
      return setSkip(toSkip)

    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const loadMoreButton = () => {
    return (
      sizeState > 0 && sizeState >= limit && (
        <button onClick={loadMore} className="btn btn-dark">
          <i className="fas fa-spinner"/> Load More<br/>
        </button>
      )
    )
  }

  const showMoreBlogs = () => {
    return loadedBlogs.map((b, i) => {
      return (
        <Card key={i} b={b}/>
      )
    })
  }

  const showBlogs = () => {
    return blogs.map((b, i) => {
      return (
        <Card key={i} b={b}/>
      )
    })
  }

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-sm btn-primary mr-1 mb-1">{c.name}</a>
      </Link>
    ))
  }

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-sm btn-outline-primary mr-1 mb-1">{t.name}</a>
      </Link>
    ))
  }

  return (
    blogs === 'error' ?
      <>
        <Layout>
          <div className="container">
            <div className="alert alert-danger mt-3">
              {message || 'No blogs yet.'}
            </div>
          </div>
        </Layout>
      </>
      :
      <>
        {head()}
        <Layout>
          <div className="container">
            <h1 className="text-center mb-4 mt-4">Programming news and tutorials</h1>
            <div className="row">
              <div className="col-md-4 order-md-12">
                <section>
                  <h5>Categories</h5>
                  <div>{showAllCategories()}</div>
                </section>
                <section>
                  <h5>Tags</h5>
                  <div>{showAllTags()}</div>
                </section>
              </div>
              <div className="col-md-8 order-md-1">
                {showBlogs()}
                {showMoreBlogs()}
                <div className="text-center mb-5">
                  <p><small className="text-center">Total of {total} blogs</small></p>
                  {loadMoreButton()}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
  )

}

export async function getServerSideProps() {
  let skip = 0
  let limit = 2

  const iniData = {
    skip,
    limit
  }

  try {
    const res = await api('POST', 'blogs', iniData)
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
        categories: res.categories,
        tags: res.tags,
        size: res.size,
        limit: limit,
        skip: skip,
        total: res.total
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

export default withRouter(Blog)