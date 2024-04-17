import React from 'react'
import useAuth from '../CustomHooks/AuthHook'
import { NavLink } from 'react-router-dom'

function DashboardMenu() {
    const { contextData } = useAuth()
  return (
    <div className='sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary'>
        <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={'-1'} id='dashbarMenu'>
            <div className="offcanvas-header">
                <h5 className="offcanvas-title"> { contextData?.currentUser.role } </h5>
                <button className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#dashbarMenu"></button>
            </div>

            <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <ul className="nav flex-column text-center">
                    <li className="nav-item">
                        <NavLink to={`/dashboard/${contextData?.currentUser.role}`} className="nav-link">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`categories`} className="nav-link">Category</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`courses`} className="nav-link">Courses</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default DashboardMenu