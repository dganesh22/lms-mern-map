const courseRoute = require('express').Router()
const { addCourse, allCourse, singleCourse, updateCourse, deleteCourse } = require('../controller/courseController')

const auth = require('../middleware/auth')
const trainerAuth = require('../middleware/trainerAuth')

courseRoute.post(`/add`, auth, trainerAuth, addCourse)
courseRoute.get(`/all`, allCourse)
courseRoute.get(`/single/:id`, singleCourse)
courseRoute.patch(`/update/:id`, auth, trainerAuth, updateCourse)
courseRoute.delete(`/delete/:id`, auth, trainerAuth, deleteCourse)

module.exports = courseRoute