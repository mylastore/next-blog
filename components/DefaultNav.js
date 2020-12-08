import {useEffect, useState} from 'react'
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
import {getCookieAsJSON} from "../actions/auth"
import {useWritable} from "../stores/userData"

Router.onRouteChangeStart = url => nprogress.start()
Router.onRouteChangeComplete = url => nprogress.done()
Router.onRouteError = url => nprogress.done()

const DefaultNav = () => {

  const [user, setUser] = useState(() => {
      getCookieAsJSON('rememberMe')
    }
  )
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  useEffect(() => {
    const authUser = getCookieAsJSON('rememberMe')
    if (authUser) {
      setUser(authUser)
    }
  }, [])

  async function userLogout() {
    try {
      const res = await api('POST', 'user/logout')
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      await logout()
      await Router.push(`/login`)
    } catch (err) {
      return flash(err.message, 'danger')
    }
  }

  return (
    <div className="Site-header">
      <Navbar color="light" light expand="md">
        <Link href="/">
          <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle}/>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link href="/blog">
                <NavLink>Blog</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link href="/secret">
                <NavLink>Secret</NavLink>
              </Link>
            </NavItem>
          </Nav>
          <Nav>
            {!user && (
              <>
                <NavItem>
                  <Link href="/login">
                    <NavLink onClick={() => userLogout(() => Router.replace(`/login`))}>Logout</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/secret">
                    <NavLink>Secret</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/login">
                    <NavLink>Login</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/register">
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
                  {user && user.role === 'user' && (
                    <DropdownItem>
                      <NavItem>
                        <Link href="/user/profile/update">
                          <NavLink>User Panel</NavLink>
                        </Link>
                      </NavItem>
                    </DropdownItem>
                  )}
                  <DropdownItem>
                    {user.role === 'admin' && (
                      <NavItem>
                        <Link href="/admin/blog">
                          <NavLink>Admin Panel</NavLink>
                        </Link>
                      </NavItem>
                    )}
                  </DropdownItem>
                  <DropdownItem divider/>
                  <DropdownItem>
                    {user && (
                      <NavItem>
                        <Link href="/login">
                          <NavLink onClick={() => userLogout(() => Router.replace(`/login`))}>Logout</NavLink>
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
