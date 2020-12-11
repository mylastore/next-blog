import React from 'react'
import {Nav, NavItem, NavLink} from 'reactstrap'
import Link from 'next/link'

const UserNav = (props) => {

  return (
    <Nav style={{background: '#F8F9FA',  marginBottom: '2em'}} vertical>
      <NavItem>
        <Link href="/user/profile/update">
          <NavLink>Profile</NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/user/blog">
          <NavLink>
            Create Blog
          </NavLink>
        </Link>
      </NavItem>
      <NavItem>
        <Link href="/user/blogs">
          <NavLink>Blog Management</NavLink>
        </Link>
      </NavItem>
    </Nav>
  )

}

export default UserNav