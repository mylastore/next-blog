import ActiveLink from './ActiveLink'
import React, {useContext, useState} from "react";
import {UserContext} from "./context/UserContext";
import {api} from "../actions/api";
import {logout} from "../actions/auth/auth";
import Router from "next/router";
import Search from "./auth/blog/Search";
import {APP_NAME} from '../config'
const Nav = () => {
  const {user, setUser} = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false)
  const [show, setShow] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const showToggle = () => {
    setShow(!show)
  }

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
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <style jsx>{`
      .nav-link {
        text-decoration: none;
      }
      .navbar-light .navbar-nav .show > .nav-link, .navbar-light .navbar-nav .active > .nav-link, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-brand.active{
        position: relative;
        color: green;
      }
      .navbar-brand.active:after {
        right: -10px;
      }
      .custom-button{
        border: none;
      }
      .animated-icon2 {
        width: 30px;
        height: 20px;
        position: relative;
        margin: 0px;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .5s ease-in-out;
        -moz-transition: .5s ease-in-out;
        -o-transition: .5s ease-in-out;
        transition: .5s ease-in-out;
        cursor: pointer;
      }
      
      .animated-icon2 span {
        display: block;
        position: absolute;
        height: 3px;
        width: 100%;
        border-radius: 9px;
        opacity: 1;
        left: 0;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: .25s ease-in-out;
        -moz-transition: .25s ease-in-out;
        -o-transition: .25s ease-in-out;
        transition: .25s ease-in-out;
      }

      .animated-icon2 span {
        background: #267bff;
      }
      
      .animated-icon2 span:nth-child(1) {
        top: 0px;
      }
      
      .animated-icon2 span:nth-child(2), .animated-icon2 span:nth-child(3) {
        top: 10px;
      }
      
      .animated-icon2 span:nth-child(4) {
        top: 20px;
      }
      
      .animated-icon2.open span:nth-child(1) {
        top: 11px;
        width: 0%;
        left: 50%;
      }
      
      .animated-icon2.open span:nth-child(2) {
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
      }
      
      .animated-icon2.open span:nth-child(3) {
        -webkit-transform: rotate(-45deg);
        -moz-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        transform: rotate(-45deg);
      }
      
      .animated-icon2.open span:nth-child(4) {
        top: 11px;
        width: 0%;
        left: 50%;
      }

    `}</style>
      <div className="container-fluid">

        <ActiveLink activeClassName="active" href="/">
          <a className="navbar-brand">{APP_NAME}</a>
        </ActiveLink>

        <button onClick={toggle} className={`navbar-toggler custom-button`} type="button" data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded={`${isOpen ? "false" : "true"}`}
                aria-label="Toggle navigation">
          <div className={`animated-icon2 ${isOpen ? 'open' : ''}`}>
            <span> </span><span> </span><span> </span><span> </span></div>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={'nav-item'}>
              <ActiveLink activeClassName="active" href="/blog">
                <a className="nav-link">Blog</a>
              </ActiveLink>
            </li>
            <li className={'nav-item'}>
              <ActiveLink activeClassName="active" href="/quote">
                <a className="nav-link">Support</a>
              </ActiveLink>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto ml-auto">
            <li className="nav-item">
              <Search />
            </li>
          </ul>
          <ul className="navbar-nav">
            {!user ? (
              <>
                <li className={'nav-item'}>
                  <ActiveLink activeClassName="active" href="/user/register">
                    <a className="nav-link">Register</a>
                  </ActiveLink>
                </li>
                <li className={'nav-item'}>
                  <ActiveLink activeClassName="active" href="/user/login">
                    <a className="nav-link">Login</a>
                  </ActiveLink>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item dropdown" onClick={showToggle}>
                  <div className="dropstart">
                    <a className={`nav-link dropdown-toggle ${show ? "show" : ""}`} href="#"
                       id="navbarDarkDropdownMenuLink" role="button"
                       data-bs-toggle="dropdown" aria-expanded={`${show ? "false" : "true"}`}>
                      {user.username}
                    </a>
                    <ul className={`dropdown-menu dropdown-menu-dark dropdown-menu-right ${show ? 'show' : ""}`}
                        aria-labelledby="navbarDarkDropdownMenuLink">
                      <li>
                        <ActiveLink activeClassName="active" href={`/public/${user.username}`}>
                          <a className="dropdown-item">Profile</a>
                        </ActiveLink>
                      </li>
                      <li>
                        <ActiveLink activeClassName="active" href="/user/profile/update">
                          <a className="dropdown-item">Panel</a>
                        </ActiveLink>
                      </li>
                      <li>
                        <a className="dropdown-item"
                           onClick={() => userLogout(() => Router.replace(`user/login`))}>Logout</a>
                      </li>
                    </ul>
                  </div>
                </li>
              </>
            )
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav
