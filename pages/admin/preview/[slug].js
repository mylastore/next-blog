import Layout from '../../../components/Layout'
import {api} from '../../../actions/api'
import {IMG} from "../../../config"
import {dateFormat} from "../../../helpers/dateFormat"
import {showCategories, showTags} from "../../../components/blog/CatsAndTags"
import styles from '../../../styles/blog.module.css'

import Link from 'next/link'
import Image from 'next/image'
import {getCookie} from "../../../actions/auth";

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
          <div className="container">
            <section>
              <div className="clearfix">
                <h1 className={'float-left'}>Blog Preview</h1>

              <Link href={'/admin/blog'}>
                <a className="float-right btn btn-primary">Go Back</a>
              </Link>

              </div>
              <hr/>
              <h1><strong>{b.title}</strong></h1>
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
                    by {b.postedBy.name} | {dateFormat(b.updatedAt, 'MM dd, yyyy')}</p>
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

export async function getServerSideProps({query}) {
  try {
    const res = await api('GET', `getblog/${query.slug}`, getCookie('token'))
    if (!res) {
      return {
        props: {
          b: 'error',
          message: 'Oops! Something is wrong. Try later'
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