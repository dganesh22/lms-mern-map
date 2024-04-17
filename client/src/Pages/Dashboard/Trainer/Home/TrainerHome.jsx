import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function TrainerHome() {
  const [courses,setCourses] = useState([])
  const [categories,setCategories] =  useState([])


  const readCourse = async () => {
    await axios.get(`/api/course/all`)
      .then(res => {
        setCourses(res.data.courses)
      }).catch(err => {
        toast.error(err.repsonse.data.msg)
      })
  }

  const readCategories = async () => {
    await axios.get(`/api/category/all`)
      .then(res => {
        setCategories(res.data.categories)
      }).catch(err => {
        toast.error(err.repsonse.data.msg)
      })
  }


  useEffect(() => {
    readCourse()
    readCategories()
  },[])

  return (
    <div className='col-md-9 col-lg-10 mt-3 p-4'>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-3">
                <div className="card bg-success">
                  <div className="card-body">
                    <h4 className="text-light">Courses</h4>
                    <h1 className="display-3 text-light"> {courses.length} </h1>
                  </div>
                </div>
            </div>
            <div className="col-md-6 mt-3">
            <div className="card bg-warning">
                  <div className="card-body">
                    <h4 className="text-light">Categories</h4>
                    <h1 className="display-3 text-light"> {categories.length} </h1>
                  </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TrainerHome