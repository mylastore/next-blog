import Layout from "../components/Layout"
import QuoteComponent from "../components/forms/QuoteComponent"

const Quote = () =>{
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="col-md-6 offset-md-3">
              <h4 className='mb-4 mt-2'>How can we help?</h4>
            <QuoteComponent />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Quote
