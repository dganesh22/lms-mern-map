const categoryRoute = require('express').Router()
const { createCategory, allCategory, singleCategory, updateCategory, deleteCategory} = require('../controller/categoryController')

const auth = require('../middleware/auth')
const trainerAuth = require('../middleware/trainerAuth')

categoryRoute.get(`/all`, allCategory)
categoryRoute.get(`/single/:id`, singleCategory)

categoryRoute.post(`/add`, auth, trainerAuth, createCategory)
categoryRoute.patch(`/update/:id`, auth,trainerAuth, updateCategory)
categoryRoute.delete(`/delete/:id`, auth, trainerAuth, deleteCategory)

module.exports = categoryRoute