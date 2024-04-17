const mongoose = require('mongoose')
const Course = require('./course')

const ChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    desc: {
        type: String,
        trim: true
    },
    type: {
        type: String,
        trim: true
    },
    url: {
        type: String,
        trim: true,
        default: ""
    },
    content: {
        type: String,
        trim: true
    },
    course: {
        type: mongoose.Schema.ObjectId,
        ref: Course
    },
    isFree: {
        type: Boolean,
        default: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{
    collection: "chapter",
    timestamps: true
})

module.exports = mongoose.model("Chapter", ChapterSchema)