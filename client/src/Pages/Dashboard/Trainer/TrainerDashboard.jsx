import React from 'react'
import DashboardMenu from '../../../Component/DashboardMenu'
import { Outlet } from 'react-router-dom'

function TrainerDashboard() {
  return (
    <div className='container'>
        <div className="row">
            <DashboardMenu/>
            <Outlet/>
        </div>
    </div>
  )
}

export default TrainerDashboard