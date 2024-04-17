const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')
const jwt = require('jsonwebtoken')


const auth = async (req,res,next) => {
    try {
        // read the token 
        let token = req.header('Authorization')

        // verify the token
         await jwt.verify(token,process.env.ACCESS_SECRET, (err,user) => {
            if(err)
                return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: `Invalid Token or Expired or Token is not found`})

            // if token is valid
            // res.json({ user })
            req.user = user  // creating new request variable

            next() // continue execution to next controller
        })
     
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = auth