import { useEffect} from 'react'
import Router from 'next/router'
import {isAuth} from '../../actions/auth'
import AdminNav from "./AdminNav"

const AdminComponent = ({children}) => {
    useEffect(() => {
        if(!isAuth()){
            Router.push(`/login`)
        }
        if(isAuth().role !== 'admin'){
            Router.push(`/`)
        }

    }, [])
    return <>
        <div className="row">
            <div className="col-md-3">
                <AdminNav />
            </div>
            <div className="col-md-9">
                {children}
            </div>
        </div>
    </>
}

export default AdminComponent