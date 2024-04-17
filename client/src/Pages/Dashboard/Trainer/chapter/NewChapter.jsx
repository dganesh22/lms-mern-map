import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function NewChapter() {
    const [chapter,setChapter] = useState({
        title: "",
        desc: "",
    })
    const navigate = useNavigate()
   
        // reading query from the url address
    const [searchParams] = useSearchParams()
    console.log(`params = `, searchParams.get('course'))

    const readInput = (e) => {
        const { name, value } = e.target
        setChapter({ ...chapter, [name]: value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            let data = {
                ...chapter,
                course: searchParams.get('course')
            }
            console.log(`chapter =`, data)

        await axios.post(`/api/chapter/add`, data)
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
                <h3 className="text-theme">New Chapter</h3>
                <p className="text-secondary"> course id = { searchParams.get('course')} </p>
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

               
              <div className="form-group mt-2">
                    <button onClick={submitHandler} className="btn btn-success">Add Chapter</button>
              </div>

            </div>
        </div>
    </div>
  )
}

export default NewChapter