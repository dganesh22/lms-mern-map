const mongoose = require('mongoose')

const connectDb = async () => {

    // developement mode for coding
    if(process.env.MODE === "development") {
        await mongoose.connect(process.env.MONGO_LOCAL)
        .then(res => {
            console.log(`local mongodb connected`)
        }).catch(err => console.log(err.message))
    }

    // production mode for hosting
    if(process.env.MODE === "production") {
        await mongoose.connect(process.env.MONGO_CLOUD)
        .then(res => {
            console.log(`cloud mongodb connected`)
        }).catch(err => console.log(err.message))
    }
}

module.exports = connectDb