import {authenticate, isAuth} from '../../actions/auth/auth'
import Router from 'next/router'
import {api} from '../../actions/api'
import {useContext} from "react";
import {UserContext} from "../context/UserContext";
import {GOOGLE_ID} from "../../config"
import GoogleLogin from 'react-google-login'

const GoogleLoginComponent = () => {
  const {setUser} = useContext(UserContext)

  const responseGoogle = async response => {
    const idToken = response.tokenId
    const data = {
      idToken: idToken
    }

    try{
      const res = await api('POST', 'user/google-login', data)
      if (res.status >= 400) {
        return flash(res.message, 'danger')
      }
      await authenticate(res, () => {})
      delete res['token']
      setUser(res)
      await Router.push(`/public/${res.username}`)

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
        cookiePolicy={'single_host_origin'}
        theme="dark"
      />
    </div>
  )

}

export default GoogleLoginComponent