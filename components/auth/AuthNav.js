import React from 'react'
import Link from 'next/link'
import ActiveLink from "../ActiveLink";

const AdminNav = () => {
  return (
    <div className="custom" style={{background: '#F8F9FA', marginBottom: '2em'}}>
      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

        <ActiveLink activeClassName="active" href="/user/blog/create-blog">
          <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" role="tab"
             aria-controls="v-pills-home" aria-selected="true">Create blog</a>
        </ActiveLink>

        <ActiveLink activeClassName="active" href="/user/profile/update">
          <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" role="tab"
             aria-controls="v-pills-profile" aria-selected="false">Profile</a>
        </ActiveLink>

        <ActiveLink activeClassName="active" href="/user/blog/categories">
          <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" role="tab"
             aria-controls="v-pills-messages" aria-selected="false">Categories</a>
        </ActiveLink>

        <ActiveLink activeClassName="active" href="/user/blog/tags">
          <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" role="tab"
             aria-controls="v-pills-settings" aria-selected="false">Tags</a>
        </ActiveLink>

        <ActiveLink activeClassName="active" href="/user/blog/blogs">
          <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" role="tab"
             aria-controls="v-pills-settings" aria-selected="false">Blog Management</a>
        </ActiveLink>

      </div>
      <style jsx>{`
          .custom {
            height: 100%;
          }    
        `}
      </style>
    </div>
  )

}

export default AdminNav