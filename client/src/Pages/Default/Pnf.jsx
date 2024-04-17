import React from 'react'

function Pnf() {
  return (
    <div className='container pt-5'>
        <div className="row">
          <div className="col-md-12 text-center">
              <img src={`${process.env.PUBLIC_URL}/images/not_found.svg`} alt="" className="img-fluid" />
              <h4 className="display-4 text-danger">404 - Requested Path Not Found</h4>
          </div>
        </div>
    </div>
  )
}

export default Pnf