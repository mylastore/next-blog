import React, {useContext, useState} from 'react'
import {APP_NAME} from '../config'
import Link from 'next/link'
import {logout} from '../actions/auth'
import {api} from '../actions/api'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import Router from 'next/router'
import nprogress from 'nprogress'
import {UserContext} from "./context/UserContext"
import Search from "./auth/blog/Search";

Router.onRouteChangeStart = url => nprogress.start()
Router.onRouteChangeComplete = url => nprogress.done()
Router.onRouteError = url => nprogress.done()

const DefaultNav = () => {
  const {user, setUser} = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  async function userLogout() {
    try {
      const res = await api('POST', 'user/logout')
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      setUser(null)
      await logout()
      await Router.push(`/user/login`)
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  return (
    <div className="Site-header">
      <Navbar color="light" light expand="md" style={{padding: '0 1rem'}}>
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} style={{margin: '8px 0'}}/>
        <Collapse isOpen={isOpen} navbar style={{padding: '0 .1rem'}}>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link href="/blog">
                <NavLink>Blog</NavLink>
              </Link>
            </NavItem>
          </Nav>
          <Nav className="mr-auto">
            <NavItem>
              <Search/>
            </NavItem>
          </Nav>
          <Nav>
            {!user && (
              <>
                <NavItem>
                  <Link href="/user/login">
                    <NavLink>Login</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/user/register">
                    <NavLink>Register</NavLink>
                  </Link>
                </NavItem>
              </>
            )}
            {user && (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <img className='avatar' src={`${user.avatar}`} alt="user avatar"/>
                  {user.username}&nbsp;&nbsp;
                  <i className="fas fa-sort-down"> </i>
                </DropdownToggle>
                <DropdownMenu right>
                  {user && (
                    <DropdownItem>
                      <NavItem>
                        <Link href="/user/profile/update">
                          <NavLink>User Panel</NavLink>
                        </Link>
                      </NavItem>
                    </DropdownItem>
                  )}
                  <DropdownItem divider/>
                  <DropdownItem>
                    {user && (
                      <NavItem>
                        <Link href="/user/login">
                          <NavLink onClick={() => userLogout(() => Router.replace(`user/login`))}>Logout</NavLink>
                        </Link>
                      </NavItem>
                    )}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default DefaultNav
