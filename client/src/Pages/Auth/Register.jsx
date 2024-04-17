import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
  const [user,setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    password: ""
  })

  const navigate = useNavigate()

  // reading value from form inputs
  const readValue = async (e) => {
    const { name, value } = e.target
    setUser({...user, [name]:value })
  }

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
        // console.log(`user =`, user)
        await axios.post(`/api/auth/register`, user)
          .then(res => {
            toast.success(res.data.msg)
            navigate(`/login`)
          }).catch(err => toast.error(err.reponse.data.msg))
    } catch (err) {
      toast.error(err.message)
    }
  }


  return (
    <div className="container pt-5">
        <div className="row d-flex align-items-start">
          <div className="col-md-6">
               <div className="card">
                <div className="card-header bg-theme text-center">
                    <h6 className="display-6 text-white">Register</h6>
                </div>
                <div className="card-body">
                    <form autoComplete="off" onSubmit={submitHandler}>
                        <div className="form-group mt-2">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" value={user.name} onChange={readValue} id="name" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={user.email} onChange={readValue} id="email" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="mobile">Mobile</label>
                            <input type="number" name="mobile" value={user.mobile} onChange={readValue} id="mobile" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" value={user.password} onChange={readValue} id="password" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <input type="submit" value="Register" className="btn bg-theme text-light" />
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                      <NavLink to={`/login`} className="float-end btn btn-link">
                         Already Registered ? Login Here
                      </NavLink>
                </div>
               </div>
          </div>
          <div className="col-md-6 d-none d-sm-none d-md-block d-lg-block">
              <img src={`${process.env.PUBLIC_URL}/images/account.svg`} alt="" className="img-fluid mt-5" />
          </div>
        </div>
    </div>
  )
}

export default Register