import Layout from "../../components/Layout"
import AdminComponent from '../../components/admin/AdminComponent'
import TagComponent from '../../components/blog/TagComponent'

const Tag = () => {
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <AdminComponent>
            <h2>Tags</h2>
            <TagComponent />
          </AdminComponent>
        </div>
      </section>
    </Layout>
  )
}

export default Tag