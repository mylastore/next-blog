import Layout from "../../components/Layout"
import {api} from '../../actions/api'
import Link from 'next/link'
import styles from '../../styles/profile.module.css'
import timeAgo from "../../helpers/timeAgo"
import Head from "next/head";
import {APP_NAME, DOMAIN, FACEBOOK_ID} from "../../config";
import AuthorEmailComponent from "../../components/forms/AuthorEmailComponent"
import {useEffect, useState} from "react";
import Cookie from 'js-cookie'

let preUserName

const publicUserProfile = ({data, message}) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(()=>{
    const authUser = Cookie.getJSON('rememberMe')
    if(authUser){
      preUserName = Cookie.getJSON('rememberMe').username
      setCurrentUser(JSON.stringify(authUser))
    }
  }, [])

  const {user, blogs} = data

  const head = () => (
    <Head>
      <title>{user.username} | {APP_NAME}</title>
      <meta name="description" content={`Blogs by ${user.username}`}/>
      <link rel="canonical" href={`${DOMAIN}/public/${user.username}`}/>
      <meta property="og:title" content={`${user.username} | ${APP_NAME}`}/>
      <meta property="og:description" content={`Blogs by ${user.username}`}/>
      <meta property="og:type" content="website"/>
      <meta property="og:url" content={`${DOMAIN}/public/${user.username}`}/>
      <meta property="og:site_name" content={`${APP_NAME}`}/>
      <meta property="og:image" content={`${user.avatar}`}/>
      <meta property="og:image:secure_url" content={`${user.avatar}`}/>
      <meta property="og:image:type" content="image/jpg"/>
      <meta property="fb:app_id" content={`${FACEBOOK_ID}`}/>
    </Head>
  )

  const showBlogLinks = () => {
    if(blogs.length){
      return blogs.map((b, i) => {
        return (
          <div key={i}>
            <Link href={`/blog/${b.slug}`}>
              <a>{b.title}</a>
            </Link>
          </div>
        )
      })
    }
    return (
      <div><p>No Blogs Yet!</p></div>
    )
  }

  return (
    data === 'error' ?
      <Layout>
        <div className="container">
          <div className="alert alert-danger mt-3">
            {message}
          </div>
        </div>
      </Layout>
      :
      <Layout>
        {head()}
        <section>
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col col-md-auto">
                <div className="text-center">
                  <div className={styles.avatar}>
                    <img src={`${user.avatar}`} alt=""/>
                  </div>
                  <h4>{user.name}</h4>
                  <h5>@{user.username}</h5>
                  <span className="small">Blogs {blogs.length}</span><br/>
                  <span className="small">Member Since </span>
                  <span className="small">{timeAgo(user.createdAt)}</span>
                  <hr/>
                  {preUserName && user.username && user.role === 'admin' ? (
                  <Link href={'/admin/profile/update'}>
                    <button className="btn btn-primary">Update Profile</button>
                  </Link>
                  ) : (
                    <Link href={'/user/profile/update'}>
                      <button className="btn btn-primary">Update Profile</button>
                    </Link>
                  )}

                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-5">
                <h4 className={'mb-3'}>Blogs by {user.name}</h4>
                <div className={styles.scroll}>
                  {showBlogLinks()}
                </div>
              </div>
              <div className="col-md-6 mt-5">
                <AuthorEmailComponent authorEmail={user.email} authorUserName={user.username}/>
              </div>
            </div>
          </div>
        </section>
      </Layout>
  )
}

export async function getServerSideProps({query}) {
  try{
    const res = await api('GET', `user/account/${query.username}`)
    if (!res) {
      return {
        props: {
          data: 'error',
          message: 'Oops! Something is wrong. Try later.'
        }
      }
    }
    if (res.status >= 400) {
      return {
        props: {
          data: 'error',
          message: res.message
        }
      }
    }
    return {
      props: {
        data: res
      }
    }

  }catch(err){
    return {
      props: {
        data: 'error',
        message: err.message
      }
    }
  }

}

export default publicUserProfile