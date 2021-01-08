import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <article className="overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mt-5">
              <h1 className="title">
                PROGRAMMING WEB DEVELOPMENT TUTORIALS
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center mt-4 mb-5">
              <p className="lead">
                Programming web development tutorials on React, Svelte, MongoDB, JavaScript, VestaCP, Ubuntu, Git, and more
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className={`card custom`} >
                <div className="card-header">
                  <Link href="categories/reactjs">
                    <a className="noLink text-center">
                      <h3 className="h1">React JS</h3>
                    </a>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">The world's most popular frontend web development library</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={`card custom`}>
                <div className="card-header">
                  <Link href="categories/nextjs">
                    <a className="noLink text-center">
                      <h3 className="h1">Next JS</h3>
                    </a>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">A production ready framework for building SEO React apps</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={`card custom`}>
                <div className="card-header">
                  <Link href="categories/sveltejs">
                    <a className="noLink text-center">
                      <h3 className="h1">Svelte JS</h3>
                    </a>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">Svelte is a compiler that generates minimal and highly optimized JavaScript code</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className={`card custom`} >
                <div className="card-header">
                  <Link href="categories/mongodb">
                    <a className="noLink text-center">
                      <h3 className="h1">MongoDB</h3>
                    </a>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">A document database with scalability and flexibility</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={`card custom`}>
                <div className="card-header">
                  <Link href="categories/javascript">
                    <a className="noLink text-center">
                      <h3 className="h1">JavaScript</h3>
                    </a>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">A scripting or programming language</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className={`card custom`}>
                <div className="card-header">
                  <Link href="categories/nodejs">
                    <a className="noLink text-center">
                      <h3 className="h1">Node JS</h3>
                    </a>
                  </Link>
                </div>
                <div className="card-body">
                  <p className="card-text">The worlds most popular backend development tool for JavaScript</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
      <style jsx>{`
        .custom {
          height: 200px;
        }
        @media (max-width: 990px) {
          .custom {
            height: 250px;
          }
        }
        @media (max-width: 767px) {
          .custom {
            height: 200px;
          }
        }
      `}</style>
    </Layout>

  )
}
