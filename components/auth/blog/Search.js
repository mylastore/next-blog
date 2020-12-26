import Link from 'next/link'
import React, {useState} from 'react'
import {api} from '../../../actions/api'

const Search = () => {
  const [values, setValues] = useState({
    query: '',
    results: [],
    searched: false,
    count: ''
  })

  const {query, results, searched, count} = values;

  async function submitForm(e) {
    e.preventDefault()
    try {
      const res = await api('GET', `blogs/search?q=${query}`)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setValues({...values, results: res, searched: true, count: `${res.length}`})

    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const resetForm = () => {
    setValues({...values, query: undefined, searched: false, results: []})
    document.getElementById("search-form").reset();
  }

  const handleChange = e => {
    setValues({...values, query: e.target.value, searched: false, results: []})
  }

  const closeSearch = () => {
    setValues({...values, query: '', searched: false, results: []})
  }

  const searchedResult = (results = []) => {
    return (
      <div className="searchForm">
        <button onClick={closeSearch} className={'customBtn btn btn-secondary btn-sm'}>Close</button>
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
        <style jsx>{`
          .searchForm{
            position: absolute;
            background: white;
            z-index: 2;
            max-width: 930px;
            margin: auto;
            display: block;
            left: 0;
            right: 0;
            padding: 2rem;
            top: 81px;
            border: solid 2px cornflowerblue;
          }
          .customBtn {
            position: absolute;
            top: 4px;
            right: 4px;
            background: #e6e9ec;
            border-radius: 0;
            color: #666;
            border: none;
            box-shadow: 0px 0px 3px #999;
          }
          .form-group{
            margin-bottom: 0;
          }
          .customBtn:hover{
            background: #ddd;
            box-shadow: 0px 0px 2px #999;
          }    
        `}
        </style>
      </div>
    )
  }

  const searchForm = () => (
    <div className="justify-content-md-center">
      <form id="search-form" onSubmit={submitForm} className="form-inline my-2 my-lg-0 my-lg-0">
        <div className="form-group has-search">
          <i className="fas fa-search form-control-feedback"> </i>
          <input type="search" className="form-control mr-sm-2" placeholder="Search" value={query}
                 onChange={handleChange}/>
        </div>
      </form>
    </div>
  )

  return (
    <>
      {searchForm()}
      {searched && <div>{searchedResult(results)}</div>}
    </>
  );
};

export default Search