import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

function Categories() {
  const [category,setCategory] = useState([])
  const [view,setView] = useState("new")

  const [data,setData] = useState({
     title: "",
     desc: ""
  })

  const readInput = async (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]:value })
  }

  const togglerHandler = async (val,id='') => {
      if(val === "new") {
        setView(val)
        setData({
          title: "",
          desc: ""
         })
      } else if (val === "edit") {
         setView(val)
         await axios.get(`/api/category/single/${id}`)
          .then(res => {
            setData(res.data.category)
          }).catch(err => toast.error(err.response.data.msg))
      }
  }

  const readData = async () => {
      await axios.get(`/api/category/all`)
        .then(res => {
            setCategory(res.data.categories)
        }).catch(err => toast.error(err.response.data.msg))
  }

  useEffect(() => {
    readData()
  },[])



 // submithandler
 const submitHandler = async (e) => {
  e.preventDefault()
  try {
    //  console.log(`data =`, data)
    if(view === "new") {
      await axios.post(`/api/category/add`,data)
      .then(res => {
        toast.success(res.data.msg)
        window.location.reload()
      }).catch(err => toast.error(err.response.data.msg))
    } 
    if(view === "edit") {
      await axios.patch(`/api/category/update/${data._id}`,data)
      .then(res => {
        toast.success(res.data.msg)
        window.location.reload()
      }).catch(err => toast.error(err.response.data.msg))
    }
  } catch (err) {
    toast.error(err.response.data.msg)
  }
 }

 // delete handler 
 const deleteHandler = async (id) => {
    if(window.confirm(`Are you sure to delete category?`)) {
      await axios.delete(`/api/category/delete/${id}`)
        .then(res => {
            toast.success(res.data.msg)
            window.location.reload()
        }).catch(err => toast.error(err.response.data.msg))
    } else {
      toast.warning('delete terminated')
    }
 }

  return (
    <div className='col-md-9 col-lg-10 col-sm-12 mt-3'>
        <div className="table table-responsive">
            <table className="table table-bordered table-striped table-hovered">
                <thead>
                    <tr>
                        <th colSpan={3}>
                            <button onClick={() => togglerHandler("new")} data-bs-toggle="modal" data-bs-target="#category" className="btn btn-dark btn-sm">
                                <i className="bi bi-plus-circle"></i> Add Category
                            </button>
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
                      category && category.map((item,index) => {
                        return (
                          <tr key={index} className='text-center'>
                              <td> { item.title } </td>
                              <td> { item.desc } </td>
                              <td>
                                    <button onClick={() => togglerHandler("edit",item._id)} data-bs-toggle="modal" data-bs-target="#category" className="btn btn-sm btn-info">
                                      <i className="bi bi-pencil"></i>
                                    </button>
                                    <button onClick={() => deleteHandler(item._id)} className="btn btn-sm btn-danger">
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

        {/* modal */}
        <div className="modal fade" tabIndex={'-1'} id="category">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h6 className="display-6 text-theme modal-title">
                      { view === "new" ? "New Category" : "Update Category"}
                  </h6>
                  <button className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <form autoComplete="off" onSubmit={submitHandler} >
                        <div className="form-group mt-2">
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={data.title} onChange={readInput} id="title" className="form-control" required />
                        </div>
                        <div className="form-group mt-2">
                            <label htmlFor="desc">Description</label>
                            <textarea name="desc" id="desc" value={data.desc} onChange={readInput} cols="30" rows="5" className="form-control" required></textarea>
                        </div>
                        <div className="form-group mt-2">
                            <button type="submit" className={view === "new"? "btn btn-success": "btn btn-info"}>
                                  {
                                    view === "new" ? "Add" : "Update"
                                  }
                            </button>
                        </div>
                    </form>
                </div>
                <div className="modal-footer"></div>
              </div>
            </div>
        </div>  
    </div>
  )
}

export default Categories