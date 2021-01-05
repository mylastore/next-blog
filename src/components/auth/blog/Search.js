import Link from 'next/link'
import React, {useState} from 'react'
import {api} from '../../../actions/api'
import style from "../../../styles/card.module.css";

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
          <i className="form-control-feedback icon">
            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
              <title>x</title>
              <path style={{fill: 'lightgray'}}
                    d="M120.5891,106.37506,96.5609,80.39355l-3.842,3.8457-4.35187-4.35187c.33368-.43195.667-.864.98346-1.30475A46.77661,46.77661,0,1,0,77.87956,89.85687q.99472-.68619,1.955-1.42987l4.34509,4.345-4.31427,4.31409,26.5097,23.5246a10.0585,10.0585,0,1,0,14.21405-14.23566ZM74.21977,74.22931a32.4793,32.4793,0,1,1,9.48859-22.94189A32.48241,32.48241,0,0,1,74.21977,74.22931Z"/>
            </svg>
          </i>
          <input type="search" className="form-control mr-sm-2" placeholder="Search" value={query}
                 onChange={handleChange}/>
        </div>
      </form>
      <style jsx>{`
        .icon svg{
          width: 20px;
          height: 20px;
        }
      `}</style>
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
