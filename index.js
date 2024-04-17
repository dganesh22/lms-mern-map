//imports
const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { StatusCodes } = require('http-status-codes')
const connectDb = require('./db/config')
const fileUpload = require("express-fileupload")
const path = require('path')

const PORT = process.env.PORT

const app = express()

// body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// middleware
app.use(cors()) // cross origin resource sharing (header properties)
app.use(cookieParser(process.env.ACCESS_SECRET)) // signed cookies (secure)
app.use(fileUpload({
    useTempFiles: true,
    limits: {
        fileSize: 1000 * 1024 * 1024 // max 1Gb
    }
}))

// index route
if(process.env.MODE === "production") {
    app.use(express.static(`client/build`))
     app.get(`*`, async (req,res) => {
        return res.sendFile(path.join(__dirname + `/client/build/index.html`))
    })
} 

if(process.env.MODE === "development") {
    app.get(`/`, async (req,res) => {
        return res.status(StatusCodes.OK).json({ status: true, msg: "Welcome to Project-LMS-API"})
    })
}

// api routes
app.use(`/api/auth`, require('./route/authRoute'))
app.use(`/api/user`, require('./route/userRoute'))
app.use(`/api/category`, require('./route/categoryRoute'))
app.use(`/api/course`, require('./route/courseRoute'))
app.use(`/api/chapter`, require('./route/chapterRoute'))
app.use(`/api/file`, require("./route/fileRoute"))

// default route
app.all(`*`, async (req,res) => {
    return res.status(StatusCodes.NOT_FOUND).json({ status: true, msg: "Requested url path not found"})
})

// server listener
app.listen(PORT,() => {
    connectDb()
    console.log(`server is running @ http://localhost:${PORT}`)
})
