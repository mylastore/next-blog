import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import Link from 'next/link'

const AdminNav = (props) => {

  return (
    <Nav style={{background: '#F8F9FA', marginBottom: '2em'}} vertical>
      <NavItem>
        <NavItem>
          <Link href="/admin/blog">
            <NavLink>
              <div className="btn btn-success btn-block">Create Blog</div>
            </NavLink>
          </Link>
        </NavItem>
        <Link href="/admin/profile/update">
          <NavLink>
            Profile
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/categories">
          <NavLink>
            Categories
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/tags">
          <NavLink>Tags</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/admin/blogs">
          <NavLink>Blog Management</NavLink>
        </Link>
      </NavItem>
    </Nav>
  )

}

export default AdminNav