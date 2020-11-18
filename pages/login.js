import Layout from "../components/Layout"
import LoginComponent from '../components/auth/LoginComponent'

const Login = () =>{
    return (
        <Layout>
            <section>
                <div className="container">
                    <div className="col-md-6 offset-md-3">
                    <LoginComponent/>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default  Login