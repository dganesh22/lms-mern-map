import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import useAuth from '../../../../CustomHooks/AuthHook'

function AdminHome() {
    const [token,setToken] = useState(
        localStorage.getItem("token") ? localStorage.getItem("token") : false 
    )
    const [users,setUsers] = useState([])
    
    const readData = useCallback(() => {
       const readInit = async () => {
           await axios.get('/api/user/all',{
            headers: {
                Authorization: `${token}`
            }
           })
        .then(res => {
             setUsers(res?.data?.users)
        })
        .catch(err => toast.error(err.repsonse.data.msg))
       }

       readInit()
    },[])

    useEffect(() => {
        readData()
    },[])
  return (
    <div className='col-md-9 col-lg-10 col-sm-12'>
        <div className="container">
           <div className="row">
                <div className="col-md-12">
                    <h3>Admin Home</h3>
                </div>
           </div>
           <div className="row">
                <div className="col-md-6">
                    <div className="card bg-success">
                        <div className="card-body">
                            <h3>Users</h3>
                            <h1 className="display-1 text-light"> { users?.length } </h1>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    </div>  
  )
}

export default AdminHome