import {useState, useEffect} from 'react'
import {getCookie, isAuth} from "../../../actions/auth"
import {api} from '../../../actions/api'
import style from '../../../styles/Admin.module.css'
import Link from "next/link"

const AllBlogs = () => {

  const [blogs, setBlogs] = useState([])
  const token = getCookie('token')

  useEffect( () => {
    (async ()=> {
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
    try{
      const res = await api('GET', `blog/${isAuth()._id}`, '', token)
      if(res.status >= 400){
        return flash(res.message, 'danger')
      }
      return setBlogs(res)

    }catch (err){
      return flash(err.message, 'danger')
    }

  }

  const deleteBlog = async (slug) => {
    try{
      const res = await api('DELETE', `blog/${slug}`, '', token)
      if(res.status >= 400 ){
        return flash(res.message, 'danger')
      }
      await loadBlogs()
      return flash('Blog was deleted.', 'success')

    }catch (err){
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
    if(blogs.length){
      return blogs.map((b, i) => {
        return (
          <div key={i} className={`col-md-12 mb-1 mt-1 ${style.customTable} `}>
            <Link href={`/blog/${b.slug}`}>
              <a className="noLink float-left">{b.title} <span className="small mark">Author: {b.postedBy.username}</span></a>
            </Link>
            <div className="float-right">
              {updateButton(b)}&nbsp;
              <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(b.slug)}>Delete</button>
            </div>
          </div>
        )
      })
    }
    return (
      <div><p>No Blogs Yet!</p></div>
    )

  }

  return (
    <>
      <div className="row">
        <h2>Blog Management</h2>
        <div className="col-md-12">
        </div>
        {showBlogs()}
      </div>
    </>
  )
}

export default AllBlogs