import Layout from "../../components/Layout"
import AdminComponent from '../../components/admin/AdminComponent'
import CreateBlogComponent from '../../components/blog/CreateBlogComponent'

const Blog = () => {
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <AdminComponent>
            <h2>Create Blog</h2>
            <CreateBlogComponent />
          </AdminComponent>
        </div>
      </section>
    </Layout>
  )
}

export default Blog