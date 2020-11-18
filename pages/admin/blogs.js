import Layout from "../../components/Layout"
import AdminComponent from '../../components/admin/AdminComponent'
import AllBlogs from '../../components/blog/AllBlogs'

const Blogs = () => {
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <AdminComponent>
            <AllBlogs />
          </AdminComponent>
        </div>
      </section>
    </Layout>
  )
}

export default Blogs