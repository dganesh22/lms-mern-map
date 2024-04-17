const { StatusCodes } = require("http-status-codes")
const User = require('../model/user')
const bcryptjs = require("bcryptjs")
const registerTemplate = require("../template/register")
const mailsend = require("../config/mail")
const generateAuthToken = require("../util/token")

// register
const registerUser = async (req,res) => {
    try {
        // read incoming data
        const { name,email, mobile, password, role } = req.body

        // check if email and mobile registered or not
        let extEmail = await User.findOne({ email })
        // if user email exists
            if(extEmail)
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `the ${email} id already registered`})

        let extMobile = await User.findOne({ mobile })
        // if user email exists
            if(extMobile)
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `the ${mobile} number already registered`})

        // encrypt the password
        let encPass = await bcryptjs.hash(password,10)

        // validate with model
        let newUser = await User.create({
            name,
            email,
            mobile,
            password: encPass,
            role
        })


        // send mail to the registered user
        let template = await registerTemplate(name,email,password)

        // dispatch mail
        let emailRes = await mailsend(newUser.email,"User Registration",template)
        
        res.status(StatusCodes.ACCEPTED).json({ status: true, msg: `user registered successfully`, user:newUser, emailRes })

    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

// login
const loginUser = async (req,res) => {
    try {
        // read the user data
        let { email, password } = req.body

        // verify the email is registered or not
        let extEmail = await User.findOne({ email })
            if(!extEmail)
                return res.status(StatusCodes.NOT_FOUND).json({ status:false, msg: `${email} is not exists`})

        // compare the passwords
        let isValid = await bcryptjs.compare(password,extEmail.password)
            if(!isValid)
                return res.status(StatusCodes.UNAUTHORIZED).json({ status: false, msg: `Passwords are not matched`})


        //  if user is temp blocked
            if(!extEmail.isActive)
                return res.status(StatusCodes.FORBIDDEN).json({ status: false, msg: `Your account is blocked by admin.`})

        // login token
        let token = await generateAuthToken(extEmail._id)

        // store token in cookie
        res.cookie("loginToken", token, {
            path: `/`,
            signed: true,
            maxAge: 1 * 24 * 60 * 60 *1000
        })

        res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "Login Successful", token, user: extEmail })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}


// logout
const logoutUser = async (req,res) => {
    try {
        res.clearCookie("loginToken",{
            path: `/`,
            httpOnly: true,
            signed: false
        })
        res.status(StatusCodes.OK).json({ status: true, msg: "logout successfully"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}


// verify token
const verifyUserId = async (req,res) => {
    try {
        let user = req.user

        // read the user data from db
        let extUser = await User.findById({ _id: user.id }).select('-password')
            if(!extUser)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false,  msg: `Requested user id not found`})
``        
        res.json({ stauts: true,  user: extUser })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message })
    }
}

module.exports = { registerUser, loginUser, logoutUser, verifyUserId }