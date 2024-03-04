const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const asyncHandler = require('./ayncHandler')


const protect = asyncHandler(
    async function (req,res,next){
        let token = req.cookies.jwt

        if(token) {
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = await User.findOne(decoded.userID).select('-password')
                next()
            } catch (error) {
                res.status(401)
                throw new Error('Not authorized, token failed')
            }
        } else {
            res.status(401)
            throw new Error('Not authorized, no token')
        }
    }
)


//Admin middleware

const admin = function (req,res,next) {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error("Not an admin")
    }
}

module.exports = {
    protect,
    admin
}