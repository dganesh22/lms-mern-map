const { StatusCodes } = require('http-status-codes')
const User = require('../model/user')

// read all users data
const readAllUsers = async (req,res) => {
    try {

        // read all users data
     const data = await User.find({})
        
    // filter admin user data
    let users = data.filter(item => item.role !== "superadmin")
     

        res.status(StatusCodes.OK).json({ status: true, length: users.length, users})

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}

module.exports = { readAllUsers }