import RegisterComponent from '../../components/auth/RegisterComponent'
import Layout from '../../components/Layout'
import isAuth from "../../actions/isAuth";

const Register = () => {
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="col-md-6 offset-md-3">
            <RegisterComponent/>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getServerSideProps({req}) {
  return await isAuth(req)
}

export default Register