import Layout from "../../components/Layout"
import AdminComponent from '../../components/admin/AdminComponent'
import UpdateBlogComponent from '../../components/blog/UpdateBlogComponent'

const UpdateBlog = () => {
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <AdminComponent>
            <UpdateBlogComponent />
          </AdminComponent>
        </div>
      </section>
    </Layout>
  )
}

export default UpdateBlog