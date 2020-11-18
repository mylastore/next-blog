import Layout from "../../components/Layout"
import UpdateBlogComponent from '../../components/blog/UpdateBlogComponent'
import UserComponent from "../../components/user/UserComponent";

const UpdateBlog = () => {
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <UserComponent>
            <UpdateBlogComponent />
          </UserComponent>
        </div>
      </section>
    </Layout>
  )
}

export default UpdateBlog