import Layout from '../components/Layout'
import Link from 'next/link'
import styles from '../styles/home.module.css'

export default function Home() {
  return (
    <Layout>
      <article className="overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mt-5">
              <h1 className="title">
                PROGRAMMING & WEB DEVELOPMENT BLOGS/TUTORIALS
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mt-4 mb-5">
              <p className="lead">
                Best programming and web development blogs and tutorials on React Node NextJs and
                JavaScript
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className={`card ${styles.customCard}`} >
                <div className="card-header">
                  <Link href="categories/reactjs">
                    <a className="noLink text-center">
                      <h3 className="h1">React Js</h3>
                    </a>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">The world's most popular frontend web development library.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={`card ${styles.customCard}`}>
                <div className="card-header">
                  <Link href="categories/nodejs">
                    <a className="noLink text-center">
                      <h3 className="h1">Node Js</h3>
                    </a>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">The worlds most popular backend development tool for JavaScript.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={`card ${styles.customCard}`}>
                <div className="card-header">
                  <Link href="categories/nextjs">
                    <a className="noLink text-center">
                      <h3 className="h1">Next Js</h3>
                    </a>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">A production ready framework for building SEO React apps.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  )
}
