const Course = require('../model/course')
const Chapter = require('../model/chapter')
const { StatusCodes } = require('http-status-codes')

// add course
const addCourse = async (req,res) => {
    try {
        const { title, desc,type, category, fee, thumbnail,publish, isActive } = req.body 

        let extCourse = await Course.findOne({ title })
            if(extCourse)
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `Course already exists.`})

        let newCourse = await Course.create({
            title,
            desc,
            type,
            category,
            fee,
            thumbnail,
            created : req.user.id,
            publish,
            isActive
        })
        
        res.status(StatusCodes.CREATED).json({ status: true, msg: "course created successfully", course: newCourse})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}
// all course
const allCourse = async (req,res) => {
    try {
        let data = await Course.find({})

        res.status(StatusCodes.OK).json({ status: true,length: data.length, courses: data })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}
// single course
const singleCourse = async (req,res) => {
    try {
        let id = req.params.id 

        let extCourse = await Course.findById(id)
            if(!extCourse)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested course id not found`})

        
        res.status(StatusCodes.OK).json({ status: true, course: extCourse })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}
// update course
const updateCourse = async (req,res) => {
    try {
        let id = req.params.id 

        let extCourse = await Course.findById(id)
            if(!extCourse)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested course id not found`})
        
        await Course.findByIdAndUpdate({_id: id }, req.body)

        res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "course updated successfully"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}
// delete course
const deleteCourse = async (req,res) => {
    try {
        let id = req.params.id 

        let extCourse = await Course.findById(id)
            if(!extCourse)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested course id not found`})

        let extChapters = await Chapter.find({})
    
        // check if any chapter related to course id exists or not
        let filterCourse = await extChapters.filter(item => item.course == id)
        
            if(filterCourse.length > 0) {
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `Course cannot be deleted because there are chapters related to it.`, filterCourse})
            } else {
               await Course.findByIdAndDelete({_id: id })
                res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "course deleted successfully"})
            }

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}

module.exports = { addCourse, allCourse, singleCourse, updateCourse, deleteCourse}