import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import {Interweave} from 'interweave'


function CourseDetails() {
    const [chapters,setChapters] =  useState([])
    const [chapter,setChapter] = useState(false)

    const params = useParams()

    const readAll = async () => {
        await axios.get(`/api/chapter/all`)
       .then(res => {
            let filterChapters = res.data.chapter.filter(item => item.course == params.id)
            setChapters(filterChapters)
       })
       .catch(err => toast.error(err.response.data.msg))
    }

    useEffect(() => {
        readAll()
    },[])

    const btnHandler = (id) => {
        let filterCha = chapters.find((item) => item._id == id)
        setChapter(filterCha)
    }

  return (
    <div className='container mt-5 p-5'>
        <div className="row d-none d-sm-block d-lg-none d-md-none">
            <div className="col-md-12 ms-5">
                <button className="btn btn-sm btn-dark position-fixed top-25 start-0" data-bs-toggle="offcanvas" data-bs-target="#courseMenu"> 
                            <i className="bi bi-list"></i>
                </button>
            </div>
        </div>
        <div className="row">
                <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary sticky-md-top sticky-lg-top">
                    <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={'-1'} id='courseMenu'>
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title">Chapter Details</h5>
                            <button className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#courseMenu"></button>
                        </div>
                        <div className="offcanvas-body h-100">
                        <ul className="nav flex-column text-center">
                            {
                               chapters &&  chapters.map((item,index) => {
                                    return (
                                       
                                            <li className="nav-item mt-2"  key={index}>
                                                <button onClick={() => btnHandler(item._id)} className="nav-link"> {item.title} </button>
                                            </li>
                                    )
                                })
                            }
                        </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-9 col-lg-10 p-3">
                    <h3> { chapter?.title } </h3>
                    <hr/>
                    <div className="card">
                        <div className="card-body">
                           {
                             (chapter?.url === "" || !chapter?.url ) ? null : 
                             <video src={`/chapter/${chapter?.course}/${chapter?.url}` || ''} type={chapter?.type} controls className='img-fluid' ></video>
                           }

                           {
                                !chapter?.content ? null : 
                                <Interweave content={ chapter?.content }/>
                           }
                        </div>
                    </div>
                </div>
            
        </div>
    </div>
  )
}

export default CourseDetails