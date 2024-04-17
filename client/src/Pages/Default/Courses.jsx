import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

function Courses() {
  const [course,setCourse] = useState([])

  const readHandler = async () => {
    await axios.get(`/api/course/all`)
      .then(res => {
          setCourse(res.data.courses)
      }).catch(err => {
        toast.error(err.response.data.msg)
      })
  }

  useEffect(() => {
    readHandler()
  },[])

  if(course.length === 0) {
      return (
        <div className="container mt-5 p-5">
            <div className="row">
                <div className="col-md-12 text-center">
                    <h4 className="text-secondary display-4">
                        No courses found
                    </h4>
                </div>
            </div>
        </div>
      )
  }

  return (
    <div className='container mt-5 p-5'>
        <div className="row">
            {
               course && course.map((item,index) => {
                  return (
                    <div className="col-md-4 col-sm-6 col-lg-3" key={index}>
                        <NavLink to={`/course/${item._id}`} className="link">
                          <div className="card">
                              <img src={`/course/${item?.thumbnail}` || `${process.env.PUBLIC_URL}/images/coming-soon.jpg`} alt="not found" className="card-img-top" />

                              <div className="card-body">
                                  <h6 className="text-theme"> {item?.title} </h6>

                                  <div className="mt-3">
                                      <p className="text-secondary text-capitalize"> { item.course_type } </p>
                                  </div>
                              </div>
                          </div>
                        </NavLink>
                    </div>
                  )
               })
            }
        </div>
    </div>
  )
}

export default Courses