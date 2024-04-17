const Chapter = require('../model/chapter')
const { StatusCodes } = require('http-status-codes')
const fs = require('fs')
const path = require('path')

// add chapter
const addChapter = async (req,res) => {
    try {
        const {title, desc, type, url, content, course, isFree } = req.body

        let extChapter = await Chapter.findOne({ title })
            if(extChapter)
                return res.status(StatusCodes.CONFLICT).json({ status: false, msg: `Chapter already exists.`})

        let newChapter = await Chapter.create({
            title,
            desc,
            type,
            url,
            content,
            course,
            isFree
        })

        res.status(StatusCodes.CREATED).json({ status: true, msg: "course created successfully", chapter: newChapter })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}
// all chapter
const allChapter = async (req,res) => {
    try {
        let data = await Chapter.find({})

        res.status(StatusCodes.ACCEPTED).json({ status: true, chapter: data })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}
// single chapter
const singleChapter = async (req,res) => {
    try {
        let id = req.params.id 

        let extChapter = await Chapter.findById(id)
            if(!extChapter)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested chapter not found`})

        
        res.status(StatusCodes.ACCEPTED).json({ status: true, chapter: extChapter })
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}
// update chapter
const updateChapter = async (req,res) => {
    try {
        let id = req.params.id 

        let extChapter = await Chapter.findById(id)
            if(!extChapter)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested chapter not found`})

        await Chapter.findByIdAndUpdate({ _id: id }, req.body)

        res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "chapter updated successfully"})
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}
// delete chapter
const deleteChapter = async (req,res) => {
    try {
        let id = req.params.id 

        let extChapter = await Chapter.findById(id)
            if(!extChapter)
                return res.status(StatusCodes.NOT_FOUND).json({ status: false, msg: `Requested chapter not found`})

         if(extChapter.url == "" || !extChapter.url) {
             await Chapter.findByIdAndDelete({ _id: id })
             return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "chapter deleted successfully"})
         } else {
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
                    await Chapter.findByIdAndDelete({_id: chId })

                    return res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "File deleted successfully"})
                })
                
                res.status(StatusCodes.ACCEPTED).json({ status: true, msg: "chapter deleted successfully"})
            }
    } catch (err) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: false, msg: err.message})
    }
}

module.exports = { addChapter, allChapter, singleChapter, updateChapter, deleteChapter}