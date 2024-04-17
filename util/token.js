const jwt = require('jsonwebtoken')

const generateAuthToken = async (id) => {
    // return jwt.sign(payload,secretkey,options)
    return jwt.sign({id}, process.env.ACCESS_SECRET, { expiresIn: '1d'})
}

module.exports = generateAuthToken