import React from 'react'

function Footer() {
  return (
    <div className='container-fluid bg-theme'>
        <div className="row p-2">
            <div className="col-md-12 d-flex justify-content-between">
                <p className="text-light">
                    <strong>All Rights Reserved.</strong>
                    <strong> &copy; {new Date().getFullYear()} </strong>
                </p>
                <p className="text-light">
                    <strong>Create and Manage by <span className="text-success">Team Project-LMS</span> </strong>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Footer