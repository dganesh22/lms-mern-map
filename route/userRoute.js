const userRoute = require('express').Router()
const { readAllUsers } = require('../controller/userController')

const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')

userRoute.get(`/all`, auth, adminAuth, readAllUsers)

module.exports = userRoute