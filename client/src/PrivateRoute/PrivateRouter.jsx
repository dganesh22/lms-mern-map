import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../CustomHooks/AuthHook'

function PrivateRouter() {

    const { contextData } = useAuth()

  return (
    <React.Fragment>
        {
            contextData.token || contextData.isLogin ? <Outlet/> : <Navigate to={`/login`} />
        }
    </React.Fragment>
  )
}

export default PrivateRouter