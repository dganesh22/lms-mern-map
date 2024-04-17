import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink, useParams, useNavigate } from 'react-router-dom'


function UpdateCourse() {
    const [course,setCourse] = useState({
        title: "",
        desc: "",
        type: "",
        category: "",
        fee: 0
    })
    const [thumbnail,setThumbnail] = useState(false)

    const [categories,setCategories] = useState([])
    const [chapters,setChapters] = useState([])

    const params = useParams()
    const navigate = useNavigate()

    const readInput = (e) => {
        const { name, value } = e.target
        setCourse({...course, [name]: value })
    }

    // read single course
    const readSingleData = async () => {
        try {
            await axios.get(`/api/course/single/${params.id}`)
            .then(res => {
                setCourse(res.data.course)
            }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }

    
  const readData = async () => {
    await axios.get(`/api/category/all`)
      .then(res => {
          setCategories(res.data.categories)
      }).catch(err => toast.error(err.response.data.msg))
}

const readChapters = async () => {
    await axios.get(`/api/chapter/all`)
      .then(res => {
        let data = res.data.chapter.filter(item => item.course === params.id)
          setChapters(data)
      }).catch(err => toast.error(err.response.data.msg))
}


useEffect(() => {
  readSingleData()
  readData()
  readChapters()
},[])

// update course
const submitHandler = async (e) => {
    e.preventDefault()
    try {
        console.log('data =', course)
        let data = {
            ...course
        }
    await axios.patch(`/api/course/update/${params.id}`,data)
        .then(res => {
            toast.success(res.data.msg)
            navigate(`/dashboard/trainer/courses`)
        }).catch(err => toast.error(err.response.data.msg))
    } catch (err) {
        toast.error(err.message)
    }
}


// file handler 
const fileHandler = (e) => {
    try {
        const file = e.target.files[0]
        // console.log(`file data =`, file)
        let formData = new FormData()
        formData.append('thumbnail', file)

        // call axios 
        axios.post(`/api/file/upload/thumbnail?cId=${params.id}`, formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        })
           .then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))
    }catch(err) {
        toast.error(err.message)
    }
}

// delete file
const deleteFile = async () => {
   if(window.confirm('Are you sure you want to delete?')) {
    try {
        await axios.delete(`/api/file/delete/thumbnail?cId=${params.id}`)
           .then(res => {
                toast.success(res.data.msg)
                window.location.reload()
            }).catch(err => toast.error(err.response.data.msg))
    } catch (err) {
        toast.error(err.message)
    }
   } else {
    toast.warning("delete terminated")
   }
}


// delete chapters = 
const deleteChapter = async (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
        try {
            // to delete chapter content file
            await axios.delete(`/api/chapter/delete/${id}`)
            .then(res => {
                 toast.success(res.data.msg)
                 window.location.reload()
             }).catch(err => toast.error(err.response.data.msg))

        } catch (err) {
            toast.error(err.message)
        }
    } else {
        toast.warning('delete terminated')
    }
}


  return (
    <div className='col-lg-10 col-md-9 col-sm-12 mt-3'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-theme">Update Course</h3>
                    <p className="text-secondary"> course id = { params.id } </p>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 col-lg-6 col-sm-12 mb-5">
                    <div className="form-group mt-3 mb-2">
                        <label htmlFor="title">Course Title</label>
                        <input type="text" name="title" value={course.title} onChange={readInput} id="title" className="form-control" required />
                    </div>

                    <div className="form-group mt-3 mb-2">
                        <label htmlFor="title">Course Description</label>
                        <input type="text" name="desc" value={course.desc} onChange={readInput} id="desc" className="form-control" required />
                    </div>

                    
                    <div className="form-group mt-3 mb-2">
                        <label htmlFor="type">Course Type</label>
                        <select name="type" value={course.type} onChange={readInput} id="type" className="form-select">
                            <option value="null">Choose Course Type</option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>

                    <div className="form-group mt-3 mb-2">
                        <label htmlFor="category">Course Category</label>
                        <select name="category" value={course.category} onChange={readInput} id="category" className="form-select">
                            <option value="null">Choose Course Category</option>
                            {
                                categories && categories.map((item,index) => {
                                    return (
                                        <option key={index} value={item.title}>{item.title}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="form-group mt-3 mb-2">
                        <label htmlFor="fee">Fee</label>
                        <input type="number" name="fee" value={course.fee} onChange={readInput} id="fee" className="form-control" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Upload Image File</label>
                        {
                            course.thumbnail !== "" ? (
                                <div className="card position-relative">
                                      <button className='btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle' onClick={deleteFile}>
                                                <i className="bi bi-trash-fill"></i>
                                        </button>
                                    <img src={`/course/${course?.thumbnail}`} alt="no pic" className="card-img-top" />
                                </div>
                            ): (
                                <label htmlFor="thumbnail">
                                <input type="file" name="thumbnail" onChange={fileHandler}  id="thumbnail" className="form-control" hidden />
                                <div className="card">
                                    <img src={`https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg`} alt="" className="card-img-top" />
                                </div>
                            </label>
                            )
                        }
                    </div>
                    
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12">
                            
                    <div className="card">
                        <div className="card-header">
                            <NavLink to={`/dashboard/trainer/chapter/new?course=${course._id}`} className="btn btn-sm btn-dark">
                                <i className="bi bi-plus-circle"></i> Add Chapter</NavLink>
                        </div>
                        <div className="card-body">
                            {
                                chapters.length === 0 ? (
                                    <p className="text-center text-secondary">No Chapters</p>
                                ): (
                                    <ul className="list-group">
                                        {
                                            chapters.map((item,index) => {
                                                return (
                                                      <li className='list-group-item mt-3'>
                                                        <NavLink  key={index} to={`/dashboard/trainer/chapter/edit/${item._id}?course=${course._id}`}>
                                                            {item.title}
                                                        </NavLink>

                                                        <button onClick={() => deleteChapter(item._id)} className="btn btn-sm btn-danger float-end">
                                                            <i className="bi bi-x-circle"></i>
                                                        </button>
                                                      </li>
                                                )
                                            })
                                        }
                                    </ul>
                                )
                            }
                        </div>
                    </div>

                   
                    <div className="form-group mt-3 mb-5">
                        <button onClick={submitHandler} className="btn btn-success">Update Course</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateCourse