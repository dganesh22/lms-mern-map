import axios from 'axios'
import React, { createContext, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

function AuthProvider(props) {
    const [token,setToken] = useState(
        localStorage.getItem("token") ? localStorage.getItem("token") : false 
    )
    const [isLogin,setIsLogin] = useState(false)
    const [currentUser,setCurrentUser] = useState(false)

    const readCurrentUser = async () => {
        await axios.get(`/api/auth/verify/user`, {
            headers: {
                Authorization: `${token}`
            }
        })
            .then(res => {
                setCurrentUser(res.data.user)
            }).catch(err => toast.error(err.response.data.msg))
    }


    const contextData = useMemo(() => ({
        token,
        isLogin,
        currentUser
    }), [token,isLogin,currentUser])

    useEffect(() => {
        if(token) {
            // set token in headers
            axios.defaults.headers.common["Authorization"] = token
            setIsLogin(true)
            readCurrentUser()
        } else {
            delete axios.defaults.headers.common["Authorization"]
        }
    },[token])

  return (
    <AuthContext.Provider value={{ contextData, setToken, setIsLogin, setCurrentUser }}>
            {
                props.children
            }
    </AuthContext.Provider>
  )
}

export default AuthProvider