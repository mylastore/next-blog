import AuthNav from "./AuthNav";

const AuthComponent = ({children}) => {
  return (
    <div className="row">
      <div className="col-md-3">
        <AuthNav/>
      </div>
      <div className="col-md-9">
        {children}
      </div>
    </div>
  )
}

export default AuthComponent