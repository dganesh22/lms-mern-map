import React from 'react'
import { NavLink } from 'react-router-dom'

function Contact() {
  return (
    <div className='container pt-5'>
        <div className="row">
          <div className="col-md-12 text-center">
              <h3 className="display-3 text-theme">Contact Us</h3>
              <h6 className="text-secondary">We're here for you: Connect with us for any queries</h6>
          </div>
        </div>
        <div className="row mb-5 p-5">
          <div className="col-md-6 col-sm-12 col-lg-6">
              <div className="card">
                <div className="card-body">
                  <p className="text-theme">For Technilcal queries, Please post your questions on our <NavLink to={`/forum`}>Forum</NavLink>, where you can get help from out alumini team.</p>

                  <p className="text-theme">For Course suggestions and career advice, check out our <NavLink to={`/learning-path`}>Learning Path</NavLink> </p>

                  <hr />

                  <form autoComplete="off">
                      <div className="form-group mt-2">
                          <label htmlFor="name">Name<sup className="text-danger">*</sup> </label>
                          <input type="text" name="name" id="name" className="form-control" required />
                      </div>
                      <div className="form-group mt-2">
                          <label htmlFor="email">Email<sup className="text-danger">*</sup> </label>
                          <input type="email" name="email" id="email" className="form-control" required />
                      </div>
                      <div className="form-group mt-2">
                          <label htmlFor="msg">Your Message<sup className="text-danger">*</sup> </label>
                          <textarea name="msg" id="msg" cols="30" rows="6" className="form-control" required></textarea>
                      </div>
                      <div className="form-group mt-2">
                          <input type="submit" value="Send" className="btn btn-success text-light" />
                      </div>
                  </form>
                </div>
              </div>
          </div>

          <div className="col-md-6 col-sm-12 col-lg-6 d-none d-md-block d-lg-block">
              <img src={`${process.env.PUBLIC_URL}/images/meeting.svg`} alt="" className="img-fluid" />
          </div>
        </div>
    </div>
  )
}

export default Contact