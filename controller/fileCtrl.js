const { StatusCodes } = require("http-status-codes")
const Course = require("../model/course")
const Chapter = require("../model/chapter")
const fs = require('fs')
const path = require('path')

// delete temporary files
const removeTemp = (path) => {
    fs.unlinkSync(path)
}

// upload thumbnail
const uploadThumbnail = async (req,res) => {
    try {
        let {thumbnail} = req.files
        let { cId } = req.query // course id

         // first check the folder exists or not
         let folder = path.join(__dirname, `../client/public/course`)
         if(!fs.existsSync(folder)){
             // create folder if not exists
             fs.mkdirSync(folder, { recursive: true })
         }
 
         // if no attachments
         if(!thumbnail){
             removeTemp(thumbnail.tempFilePath)
             return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `No files found for uploading`})
         }

          // file name
        let extName = path.extname(thumbnail.name)
        let fileName = `${cId}${extName}`

        // check if files already exist or not
        let filePath = path.join(__dirname, `../client/public/course`, `${fileName}`)
            if(fs.existsSync(filePath)) {
                removeTemp(thumbnail.tempFilePath)
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `File already exists`})
            }

         // validate the file extension
         if(thumbnail.mimetype === "image/png" || thumbnail.mimetype === "image/jpeg" || thumbnail.mimetype === "image/jpg") {
            // upload a file
            thumbnail.mv(filePath, async (err) => {
                if(err) {
                    removeTemp(thumbnail.tempFilePath)
                    return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `File upload failed`})
                }

                // update in chapter
                let extCourse = await Course.findById({ _id: cId })
                    if(!extCourse)
                        return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested course not found`})
                
                await Course.findByIdAndUpdate({_id: cId }, { thumbnail: fileName})

                return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "File uploaded successfully"})
            })
        } else {
            removeTemp(thumbnail.tempFilePath)
            return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `Invalid file type`})
        }


    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}

// delete thumbnail
const deleteThumbnail = async (req,res) => {
    try {
        let { cId } = req.query

        let extCourse = await Course.findById({ _id: cId })
            if(!extCourse)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Course not found` })

          // check if files already exist or not
          let filePath = path.join(__dirname, `../client/public/course`, `${extCourse.thumbnail}`)
          if(!fs.existsSync(filePath)) {
              return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `File not exists`})
          }

          // delete a file
          fs.unlink(filePath, async (err) => {
              if(err) {
                  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
              }

              // update course
              await Course.findByIdAndUpdate({_id: cId }, { thumbnail: ""})

              return res.status(StatusCodes.OK).json({ status: true, msg: "File deleted successfully" })
              })
    } catch (err) {
        return res.status(StatusCodes)
    }
}


// upload file
const uploadFile = async (req,res) => {
    try {
        let {cFile} = req.files
        let { cId, chId } = req.query // course id and chapter id


        // first check the folder exists or not
        let folder = path.join(__dirname, `../client/public/chapter/${cId}`)
        if(!fs.existsSync(folder)){
            // create folder if not exists
            fs.mkdirSync(folder, { recursive: true })
        }

        // if no fattachments
        if(!cFile){
            removeTemp(cFile.tempFilePath)
            return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `No files found for uploading`})
        }

        // file name
        let fileName = cFile.name

        // check if files already exist or not
        let filePath = path.join(__dirname, `../client/public/chapter/${cId}`, `${fileName}`)
            if(fs.existsSync(filePath)) {
                removeTemp(cFile.tempFilePath)
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `File already exists`})
            }

        // validate the file extension
        if(cFile.mimetype === "audio/mp3" || cFile.mimetype === "video/mp4" || cFile.mimetype === "file/pdf") {
            // upload a file
            cFile.mv(filePath, async (err) => {
                if(err) {
                    removeTemp(cFile.tempFilePath)
                    return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `File upload failed`})
                }

                // update in chapter
                let extChapter = await Chapter.findById({ _id: chId })
                    if(!extChapter)
                        return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested chapter not found`})
                
                await Chapter.findByIdAndUpdate({_id: chId }, { course: cId, url: fileName, type: cFile.mimetype})

                return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "File uploaded successfully"})
            })
        } else {
            removeTemp(cFile.tempFilePath)
            return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `Invalid file type`})
        }

    } catch (err) {
        return res.status(StatusCodes)
    }
}

// delete file
const deleteFile = async (req,res) => {
    try {
    
        let { chId } = req.query //  chapter id 

        let extChapter = await Chapter.findById({ _id: chId })
            if(!extChapter)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "Chapter not found" })

        // check if the chapter file exists or not
        let filePath = path.join(__dirname, `../client/public/chapter/${extChapter.course}`, `${extChapter.url}`)
            if(!fs.existsSync(filePath)) {
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: "File not found" })
            }

        // delete the file
        fs.unlink(filePath, async (err) => {
            if(err) {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
            }

             // update in chapter collection
             await Chapter.findByIdAndUpdate({_id: chId }, {url: ""})

             return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "File deleted successfully"})
        })
    } catch (err) {
        return res.status(StatusCodes)
    }
}


module.exports = {
    uploadFile,
    deleteFile,
    uploadThumbnail,
    deleteThumbnail
}