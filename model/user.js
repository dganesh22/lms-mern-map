const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    mobile: {
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required:true,
        trim: true
    },
    dob: {
        type: Date,
        default: new Date().toString()
    },
    address: {
        type: Object,
        default: {

        }
    },
    likes:[
        {
            type: String
        }
    ],
    role: {
        type: String,
        enum: ["student","superadmin","trainer"],
        default: "student"
    },
    isActive:{
        type: Boolean,
        default: true
        
    }
},{
    collection: "users",
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema)