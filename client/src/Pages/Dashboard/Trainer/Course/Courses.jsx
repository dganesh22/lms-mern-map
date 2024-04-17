import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {toast} from 'react-toastify'
import axios from 'axios'

function AllCourses() {
    const [courses,setCourses] = useState([])

    const readAllCourses = async () => {
        try {
            await axios.get(`/api/course/all`)
                .then(res => {
                    setCourses(res.data.courses)
                }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        readAllCourses()
    },[])

    // course delete option
    const deleteCourse = async (id) => {
        try {
           if(window.confirm('Are you sure you want to delete?')) {
            await axios.delete(`/api/course/delete/${id}`)
            .then(res => {
                 toast.success(res.data.msg)
                 window.location.reload()
             }).catch(err => toast.error(err.response.data.msg))
           }
        } catch (err) {
            toast.error(err.message)
        }
    }

  return (
    <div className='col-md-9 col-lg-10 mt-3'>
        <div className="table table-responsive">
            <div className="table table-responsive">
                <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr>
                          <th colSpan={4}>
                              <NavLink to={`new`} className="btn btn-sm btn-dark">
                                  <i className="bi bi-plus-circle"></i> Create Course
                              </NavLink>
                          </th>
                      </tr>
                      <tr className='text-center'>
                          <th>Title</th>
                          <th>Description</th>
                          <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                            courses && courses.map((item,index) => {
                                return (
                                    <tr key={index} className='text-center'>
                                        <td> {item.title} </td>
                                        <td> { item.desc } </td>
                                        <td>
                                            <NavLink to={`/dashboard/trainer/courses/update/${item._id}`} className="btn btn-info me-3">
                                                <i className="bi bi-pencil"></i>
                                            </NavLink>
                                            <button onClick={() => deleteCourse(item._id)}  className="btn btn-danger">
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default AllCourses