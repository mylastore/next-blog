import RegisterComponent from '../components/auth/RegisterComponent'
import Layout from '../components/Layout'
import parseCookies from "../helpers/parseCookies";

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
  const cookies = parseCookies(req)
  if (cookies.token) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      }
    }
  } else {
    return {
      props: {}
    }
  }
}

export default Register