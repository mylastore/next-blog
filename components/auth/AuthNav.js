import React from 'react'
import Link from 'next/link'

const AdminNav = () => {
  return (
    <div>
      <ul className="nav flex-column" style={{background: '#F8F9FA', marginBottom: '2em'}}>
        <li className="nav-item">
          <Link href="/user/blog/create-blog">
            <button className="custom btn btn-success btn-block mb-4">Create Blog</button>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/user/profile/update">
            <a className="nav-link">Profile</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/user/blog/categories">
            <a className="nav-link">Categories</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/user/blog/tags">
            <a className="nav-link">Tags</a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/user/blog/blogs">
            <a className="nav-link">Blog Management</a>
          </Link>
        </li>
      </ul>
      <style jsx>{`
          .custom {
            border-radius: 0;
            box-shadow: 0px 0px 2px 0 gray;
          }    
        `}
      </style>
    </div>
  )

}

export default AdminNav