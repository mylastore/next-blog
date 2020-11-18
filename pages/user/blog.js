import Layout from "../../components/Layout"
import UserComponent from '../../components/user/UserComponent'
import CreateBlogComponent from '../../components/blog/CreateBlogComponent'

const Blog = () => {
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <UserComponent>
            <h2>Create Blog</h2>
            <CreateBlogComponent />
          </UserComponent>
        </div>
      </section>
    </Layout>
  )
}

export default Blog