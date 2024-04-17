const fileRoute = require("express").Router()
const { uploadFile, deleteFile, uploadThumbnail, deleteThumbnail } = require("../controller/fileCtrl")

// chapters
fileRoute.post("/upload", uploadFile)
fileRoute.delete("/delete", deleteFile)

// course thumbnail
fileRoute.post("/upload/thumbnail", uploadThumbnail)
fileRoute.delete("/delete/thumbnail", deleteThumbnail)

module.exports = fileRoute