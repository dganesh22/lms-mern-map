const authRoute = require('express').Router()
const { registerUser, loginUser, logoutUser, verifyUserId } = require('../controller/authController')
const auth = require('../middleware/auth')

// post route
authRoute.post(`/register`, registerUser)
authRoute.post(`/login`, loginUser)

// get route
authRoute.get(`/logout`, logoutUser)
authRoute.get(`/verify/user`, auth, verifyUserId)

module.exports = authRoute