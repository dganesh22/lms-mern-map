import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSearchParams, useParams, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill';
import axios from 'axios'

function UpdateChapter() {
    const [chapter,setChapter] = useState({
        title: "",
        desc: "",
        type: ""
    })

    const params  = useParams()
    const navigate = useNavigate()

    // file link
    const [url,setUrl] = useState(false)

    const [content,setContent] = useState('')

       // reading query from the url address
       const [searchParams] = useSearchParams()
       console.log(`params = `, searchParams.get('course'))

    const readCh = async () => {
        try {
            await axios.get(`/api/chapter/single/${params.id}`)
               .then(res => {
                    setChapter(res.data.chapter)
                }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        readCh()
    },[])

    const readInput = (e) => {
        const { name, value } = e.target
        setChapter({ ...chapter, [name]: value })
    }

    // file handler 
    const fileHandler = (e) => {
        try {
            const file = e.target.files[0]
            // console.log(`file data =`, file)
            let formData = new FormData()
            formData.append('cFile', file)

            // call axios 
            axios.post(`/api/file/upload?cId=${searchParams.get('course')}&chId=${params.id}`, formData, {
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
            await axios.delete(`/api/file/delete?chId=${params.id}`)
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

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let data = {
                ...chapter,
                content
            }
            console.log(`chapter =`, data)

            await axios.patch(`/api/chapter/update/${params.id}`, data)
                .then(res => {
                    toast.success(res.data.msg)
                    navigate(`/dashboard/trainer/courses/update/${searchParams.get('course')}`)
                }).catch(err => toast.error(err.response.data.msg))
        } catch (err) {
            toast.error(err.message)
        }
    }

  return (
    <div className='col-lg-10 col-md-9 col-sm-12 mt-3'>
        <div className="row">
            <div className="col-md-12">
                <h3 className="text-theme">Update Chapter</h3>
            </div>
        </div>

        <div className="row">
            <div className="col-md-6 col-lg-6 col-sm-12">

                <div className="form-group mt-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" value={chapter.title} onChange={readInput} className="form-control"  required/>
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="desc">Description</label>
                    <input type="text" name="desc" value={chapter.desc} onChange={readInput} id="desc" className="form-control"  required/>
                </div>


                <div className="form-group mt-3">
                            <label htmlFor="">Update Text</label>
                           <ReactQuill
                            theme="snow" value={content} onChange={setContent} 
                           />
                </div>

            </div>
            <div className="col-md-6 col-lg-6 col-sm-12">

                        <div className="form-group mt-2">
                            <label htmlFor="">Upload File</label>
                           {
                                chapter?.url ? 
                                (
                                    <div className="card">
                                        <div className="card-body position-relative">
                                            <button className='btn btn-sm btn-outline-danger position-absolute top-0 start-100 translate-middle' onClick={deleteFile}>
                                                <i className="bi bi-trash-fill"></i>
                                            </button>
                                        <video type={chapter?.type} src={`/chapter/${chapter.course}/${chapter.url}`} controls width={'100%'} ></video>
                                        </div>
                                    </div>
                                )
                                : (
                                    <label htmlFor="url">
                                    <input type="file" name="url"  onChange={fileHandler} id="url" className="form-control" hidden />
                                    <div className="card">
                                        <img src={`https://t4.ftcdn.net/jpg/01/64/16/59/360_F_164165971_ELxPPwdwHYEhg4vZ3F4Ej7OmZVzqq4Ov.jpg`} alt="" className="card-img-top" />
                                    </div>
                                </label>
                                )
                           }
                        </div>


              <div className="form-group mt-2">
                    <button onClick={submitHandler} className="btn btn-success">Update Chapter</button>
              </div>

            </div>
        </div>
    </div>
  )
}

export default UpdateChapter