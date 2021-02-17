import React, {useState, useEffect} from 'react'
import {getCookie, isAuth} from "../../../actions/auth/auth"
import {api} from '../../../actions/api'
import Link from "next/link"

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([])
  const token = getCookie('token')

  useEffect(() => {
    (async () => {
      await loadBlogs()
    })()
  }, [])

  const updateButton = b => {
    return (
      <Link href={`/user/blog/update/${b.slug}`}>
        <a className="btn btn-sm btn-outline-success">Update</a>
      </Link>
    )
  }

  const loadBlogs = async () => {
    try {
      const res = await api('GET', `blog/${isAuth()._id}`, '', token)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      return setBlogs(res)
    } catch (err) {
      return flash(err.message, 'danger')
    }

  }

  const deleteBlog = async (slug) => {
    try {
      const res = await api('DELETE', `blog/${slug}`, '', token)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      await loadBlogs()
      return flash('Blog was deleted.', 'success')

    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  const confirmDelete = async (slug) => {
    const answer = window.confirm('Are you sure?')
    if (answer) {
      await deleteBlog(slug)
    }
  }

  const showBlogs = () => {
    if (blogs.length) {
      return blogs.map((b, i) => {
        return (
          <div key={i} className={`col-md-12 mb-1 mt-1 customTable`}>
            <Link href={`/blog/${b.slug}`}>
              <a className="noLink float-left">{b.title} </a>
            </Link>
            <br/>
            {b.categories.map((c, i) => {
              return (
                <span key={i} className={'badge badge-primary mr-2'}>{c.name}</span>
              )
            })
            }
            {b.tags.map((t, i) => {
              return (
                <span key={i} className={'badge badge-light mr-2'}>{t.name}</span>
              )
            })
            }
            <div className="float-right">
                            <span
                              className={'badge bg-light text-dark mr-2'}>{b.published ? 'Published ' : 'Draft '}</span>
              {updateButton(b)}&nbsp;
              <button className="btn btn-sm btn-outline-danger"
                      onClick={() => confirmDelete(b.slug)}>Delete
              </button>
            </div>
            <style jsx>{`
              .badge-light{
                border: solid 1px #007bff;
                color: #007bff;
                background: white;
              }
              .customTable{
                  border-top: solid 1px #e5e5e5;
                  width: 100%;
                  padding: 10px 0;
              }
            `}</style>
          </div>
        )
      })
    } else {
      return (

        <section className={'container-fluid'}>NO BLOGS FOUND</section>
      )
    }
  }

  return (
    <div className="row">
      <h2>Blog Management</h2>
      {showBlogs()}
    </div>
  )
}

export default AllBlogs
