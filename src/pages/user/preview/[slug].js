import Layout from '../../../components/Layout'
import {api} from '../../../actions/api'
import {IMG} from "../../../config"
import {showCategories, showTags} from "../../../components/auth/blog/CatsAndTags"
import Link from 'next/link'
import Image from 'next/image'
import AuthComponent from "../../../components/auth/AuthComponent";
import parseCookies from "../../../actions/parseCookies";
import timeAgo from "../../../actions/timeAgo";
import styles from '../../../styles/blog.module.css'

const blogPreview = ({b, message}) => {
  return (
    b === 'error' ?
      <Layout>
        <div className="container">
          <div className="alert alert-danger mt-3">
            {message}
          </div>
        </div>
      </Layout>

      :
      <Layout>
        <article>
          <div className="container-fluid">
            <AuthComponent>
            <section>
              <div className="clearfix">
                <div className="alert alert-info" role="alert">
                  <h5 className={'text-center'}>Blog Preview</h5>
                </div>
              </div>
              <hr/>
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
                  <p className="mark small">Written
                    by {b.postedBy.name} | {timeAgo(b.createdAt)}</p>
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
            </AuthComponent>
          </div>

          <style jsx>{`
        .center {
          margin: auto;
        }

      `}</style>
        </article>
      </Layout>

  )
}

export async function getServerSideProps({query, req}) {
  const cookies = parseCookies(req)
  const token = cookies.token
  if(!token){
    return {
      redirect: {
        permanent: false,
        destination: '/user/login',
      },
      props: {
        token: null
      }
    }
  }
  try {
    const res = await api('GET', `getblog/${query.slug}`, token)
    if (!res) {
      return {
        props: {
          b: 'error',
          message: 'Oops! Something is wrong. Try later'
        }
      }
    }
    if(res.status === 401){
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
        props: {
          token: null
        }
      }
    }
    if (res.status >= 400) {
      return {
        props: {
          b: 'error',
          message: res.message
        }
      }
    }
    return {
      props: {
        b: res
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

export default blogPreview
