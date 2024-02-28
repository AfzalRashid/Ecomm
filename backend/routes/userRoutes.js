const express = require('express')
const router = express.Router()
const {authUser} = require('../controllers/userController')

// router.route('/').get(getUsers).post(registerUser)
// router.post('/logout', logoutUser)
router.post('/login', authUser)
// router.route('/profile').get(getUserProfile).post(updateUserProfile)
// router.route('/:id').get(getUserByID).delete(deleteUser).put(updateUser)

module.exports = router