import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import Link from 'next/link'

const AdminNav = () => {
  return (
    <Nav style={{background: '#F8F9FA', marginBottom: '2em'}} vertical>
      <NavItem>
        <NavItem>
          <Link href="/user/blog/create-blog">
            <NavLink style={{padding: 0}}>
              <button className="custom btn btn-success btn-block mb-4">Create Blog</button>
            </NavLink>
          </Link>
        </NavItem>
        <Link href="/user/profile/update">
          <NavLink>
            Profile
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/user/blog/categories">
          <NavLink>
            Categories
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/user/blog/tags">
          <NavLink>Tags</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/user/blog/blogs">
          <NavLink>Blog Management</NavLink>
        </Link>
      </NavItem>
      <style jsx>{`
        .custom {
          border-radius: 0;
          box-shadow: 0px 0px 2px 0 gray;
        }

      `}</style>
    </Nav>

  )


}

export default AdminNav