import Layout from "../../components/Layout"
import AllBlogs from '../../components/blog/AllBlogs'
import UserComponent from "../../components/user/UserComponent";

const Blogs = () => {
  return (
    <Layout>
      <section>
        <div className="container-fluid">
          <UserComponent>
            <AllBlogs />
          </UserComponent>
        </div>
      </section>
    </Layout>
  )
}

export default Blogs