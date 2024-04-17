import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminMenu from '../../../Component/AdminMenu'

function AdminDshboard() {
  return (
    <div className='container-fluid p-3'>
      <div className="row">
          <AdminMenu/>
          <Outlet/>
      </div>
    </div>
  )
}

export default AdminDshboard