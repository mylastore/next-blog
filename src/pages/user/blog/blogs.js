import Layout from "../../../components/Layout"
import AllBlogs from '../../../components/auth/blog/AllBlogs'
import handleAuthSSR from "../../../actions/authSSR";
import AuthComponent from "../../../components/auth/AuthComponent";

const Blogs = () => {
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <AuthComponent>
            <AllBlogs />
          </AuthComponent>
        </div>
      </section>
    </Layout>
  )
}

export default Blogs

export async function getServerSideProps({req, res}) {
  return await handleAuthSSR(req, res)
}