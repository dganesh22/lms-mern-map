import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


function NewCourse() {
  const [title,setTitle] = useState('')
  const [desc,setDesc] = useState('')

  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
        try {
            let data = {
                title,
                desc
            }

            await axios.post(`/api/course/add`, data)
                .then(res => {
                    toast.success(res.data.msg)
                    navigate(`/dashboard/trainer/courses/update/${res.data.course._id}`)
                }).catch(err => {
                    toast.error(err.response.data.msg)
                })
        }catch(err) {
            toast.error(err.message)
        }
  }

  return (
    <div className='col-lg-10 col-md-9 col-sm-12 mt-3'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-theme">New Course</h3>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="form-group mt-3 mb-2">
                        <label htmlFor="title">Course Title</label>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} id="title" className="form-control" required />
                    </div>

                    <div className="form-group mt-3 mb-2">
                        <label htmlFor="title">Course Description</label>
                        <input type="text" name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} id="desc" className="form-control" required />
                    </div>


                    <div className="form-group mt-3 mb-2">
                        <button onClick={submitHandler} className="btn btn-success">Create Course</button>
                    </div>
                    
                </div>
               
            </div>
        </div>
    </div>
  )
}

export default NewCourse