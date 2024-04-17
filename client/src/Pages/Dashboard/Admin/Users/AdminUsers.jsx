import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

function AdminUsers() {
    const [users,setUsers] = useState([])
    


    const readData = useCallback(() => {
        axios.get('/api/user/all')
       .then(res => {
            setUsers(res.data.users)
       })
       .catch(err => toast.error(err.repsonse.data.msg))
    },[])

    useEffect(() => {
        readData()
    },[])


    const deleteHandler = async (id) => {
        
    }

  return (
    <div className='col-md-9 col-lg-10 col-sm-12'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3>Admin Users</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="table table-responsive">
                        <table className="table table-hovered table-striped table-bordered">
                            <thead>
                                <tr className='text-center'>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users && users.map((item,index) => {
                                        return(
                                            
                                            <tr key={index} className='text-center'>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobile}</td>
                                                <td>{item.role}</td>
                                                <td>
                                                    <button onClick={() => deleteHandler(item._id)} className="btn btn-sm btn-danger">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>  
  )
}

export default AdminUsers