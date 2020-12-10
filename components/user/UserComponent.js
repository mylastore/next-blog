import UserNav from "./UserNav"

const UserComponent = ({children}) => {
  return (
    <div className="row">
      <div className="col-md-3">
        <UserNav/>
      </div>
      <div className="col-md-9">
        {children}
      </div>
    </div>
  )
}

export default UserComponent