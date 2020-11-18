import Layout from "../../components/Layout"
import AdminComponent from '../../components/admin/AdminComponent'
import CategoryComponent from '../../components/blog/CategoryComponent'

const Categories = () => {
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <AdminComponent>
            <h2>Categories</h2>
            <CategoryComponent />
          </AdminComponent>
        </div>
      </section>
    </Layout>
  )
}

export default Categories