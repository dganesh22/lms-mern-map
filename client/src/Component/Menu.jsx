import React from 'react'
import { NavLink } from 'react-router-dom'
import useAuth from '../CustomHooks/AuthHook'
import {toast} from 'react-toastify'
import axios from 'axios'

function Menu() {
    const { contextData, setToken, setIsLogin, setCurrentUser } = useAuth()

    const logoutHandler = async () => {
        try {
            if(window.confirm(`Are you sure to logout?`)) {
                await axios.get(`/api/auth/logout`)
                .then(res => {
                    toast.success(res.data.msg)
                    localStorage.clear()
                    setToken(false)
                    setIsLogin(false)
                    setCurrentUser(false)
                }).catch(err => toast.error(err.response.data.msg))
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
  return (
    <header className='mb-5'>
            <nav className="navbar navbar-expand-md navbar-dark bg-theme fixed-top">
                <div className="container">
                       <div className='d-flex'>
                            <button className="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#menu"> 
                                            <span className="navbar-toggler-icon"></span>
                            </button>
                                
                            <NavLink to={`/`} className="navbar-brand ms-3">Project-LMS</NavLink>
                       </div>
                    
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to={`/courses`} className="nav-link">Courses</NavLink>
                        </li>
                    </ul>
                    
                    <div>
                       {
                            contextData.token && contextData.isLogin ? (
                                <NavLink to={`/`} className="btn btn-outline-danger me-4" onClick={logoutHandler} >Logout</NavLink>
                            ) : (
                                <NavLink to={`/login`} className="btn btn-outline-secondary me-4">Login</NavLink>
                            )
                       }
                        
                        <button className="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#dashbarMenu"> 
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </nav>

            <div className="offcanvas offcanvas-start w-md-25" tabIndex={'-1'} id='menu'>
                <div className="offcanvas-header">
                    <h6 className="display-6 text-theme offcanvas-title">Project-LMS</h6>
                    <button className="btn-close" data-bs-dismiss="offcanvas" />
                </div>

                <div className="offcanvas-body">
                    <ul className="nav nav-pills flex-column text-center">
                        <li className="nav-item">
                            <NavLink to={`/`} className="nav-link"> 
                            <i className="bi bi-house me-2"></i> Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/about`} className="nav-link">
                              <i className="bi bi-person me-2"></i>  About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/contact`} className="nav-link">
                               <i className="bi bi-person-rolodex me-2"></i> Contact</NavLink>
                        </li>
                    </ul>
                    <hr />

                    {
                        contextData?.token && contextData.isLogin ? (
                            <ul className="nav flex-column text-center mt-4">
                                <li className="nav-item">
                                    <NavLink to={`/dashboard/${contextData?.currentUser.role}`} className="nav-link">Dashboard</NavLink>
                                </li>
                            </ul>
                        ) : null 
                    }
                </div>
            </div>
    </header>
  )
}

export default Menu