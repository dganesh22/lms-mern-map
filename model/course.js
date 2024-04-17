const mongoose = require('mongoose')
const User  = require('./user')

const CourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    desc: {
        type: String,
        trim: true
    },
    type:{
        type: String,
        enum: ["free", "paid"],
        default: "free"
    },
    category: {
        type: String,
        trim: true
    },
    fee: {
        type: Number,
        default: 0
    },
    thumbnail: {
        type: String,
        trim: true,
        default: ""
    },
    created: {
        type: mongoose.Schema.ObjectId,
        ref: User
    },
    publish: {
        type: Boolean,
        default: false 
    },
    isActive: {
        type: Boolean,
        default: true
    }
},{
    collection: "course",
    timestamps: true
})

module.exports = mongoose.model("Course", CourseSchema)