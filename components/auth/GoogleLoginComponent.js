import {authenticate, isAuth} from '../../actions/auth'
import Router from 'next/router'
import {api} from '../../actions/api'
import {GOOGLE_ID} from "../../config"
import GoogleLogin from 'react-google-login'

const GoogleLoginComponent = () => {

  const responseGoogle = async (response) => {
    const idToken = response.tokenId
    const data = {
      idToken: idToken
    }

    try{
      const res = await api('POST', 'user/google-login', data)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      authenticate(res, () => {
        if(isAuth() && isAuth().role === 'admin'){
          return Router.push(`/admin/profile/update`)
        } else {
          return Router.push(`/user/profile/update`)
        }
      })

    }catch (err){
      flash(err.message, 'danger')
    }
  }

  return (
    <div className="text-center">
      <GoogleLogin
        clientId = {GOOGLE_ID}
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        theme="dark"
      />
    </div>
  )

}

export default GoogleLoginComponent