const User = require('../models/user.model')
const asyncHandler = require('../middleware/ayncHandler')
const generateToken = require('../utils/generateToken')

// User authentiction

module.exports.authUser = asyncHandler(async (req,res) => {
const {email, password} = req.body

const user = await User.findOne({email})

if(user && await user.matchPassword(password)) {

    generateToken(res, user._id)

    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    })
} else {
    res.status(401)
    throw new Error('Invalid user')
}
})

// User Logout

module.exports.logoutUser = asyncHandler( function (req,res) {
    res.cookie('jwt', '',{
        httpOnly : true,
        expires: new Date(0)
})
    res.status(200).send("Logged out successfully")

})


// User registration

module.exports.registerUser = asyncHandler(async function (req,res){
    const {name,email,password} = req.body
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({name, email, password})

    if (user) {

        generateToken(res, user._id)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})


// User Profile

module.exports.getUserProfile = asyncHandler(async function (req,res) {

    const user = req.user // This I have done differently

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


// User Profile Update


module.exports.updateUserProfile = asyncHandler(async function(req,res) {

    const user = await User.findById(req.user._id)

    if (user) {
        user.email = req.body.email || user.email
        user.name = req.body.name || user.name

        if (req.body.password){
            user.password = req.body.password
        }

    const updatedUser = await user.save()

    if(updatedUser) {
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }
} else {
    res.status(404)
    throw new Error("User not found")
}

})
