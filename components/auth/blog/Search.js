import Link from 'next/link'
import {useState} from 'react'
import {api} from '../../../actions/api'

const Search = () => {
  const [values, setValues] = useState({
    query: undefined,
    results: [],
    searched: false,
    count: ''
  })

  const {query, results, searched, count} = values;

  async function submitForm(e) {
    e.preventDefault()
    try{
      const res = await api('GET', `blogs/search?q=${query}`)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      setValues({...values, results: res, searched: true, count: `${res.length}`})

    }catch (err){
      return flash(err.message, 'danger')
    }
  }

  const resetForm = () => {
    setValues({...values, query: undefined, searched: false, results: []})
    document.getElementById("myForm").reset();
  }

  const handleChange = e => {
    setValues({...values, query: e.target.value, searched: false, results: []})
  }

  const searchedResult = (results = []) => {
    return (
      <div className="searchForm">
        <h4>SEARCH RESULTS</h4>
        <hr/>
        {count && <h5>Found {count} blogs</h5>}
        {results.map((blog, i) => {
          return (
            <div className='mt-1' key={i}>
              <Link href={`/blog/${blog.slug}`}>
                <a onClick={resetForm}>{blog.title}</a>
              </Link>
            </div>
          );
        })}
      </div>
    )
  }

  const searchForm = () => (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <form id="myForm" onSubmit={submitForm}>
          <div className="form-group has-search">
            <i className="fas fa-search form-control-feedback"> </i>
            <input type="search" className="form-control" placeholder="Search" onChange={handleChange}/>
          </div>
        </form>
      </div>
    </div>
  )

  return (
    <div className='searchContainer'>
      <div className="container mt-2">
        {searchForm()}
        {searched && <div className='searResult'>{searchedResult(results)}</div>}
      </div>
    </div>
  );
};

export default Search