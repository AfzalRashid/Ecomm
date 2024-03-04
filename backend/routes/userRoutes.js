const express = require('express')
const router = express.Router()
const {authUser, logoutUser, registerUser,getUserProfile, updateUserProfile} = require('../controllers/userController')
const {protect, admin} = require('../middleware/authMiddleware')

//router.route('/').get(protect, admin, getUsers).post(registerUser)
router.post('/',registerUser) // this is temporary abov is the actual one
router.post('/logout', logoutUser)
router.post('/auth', authUser)
router.route('/profile').get(protect, getUserProfile).post(protect, updateUserProfile)
// router.route('/:id').get(protect, admin, getUserByID).delete(protect, admin, deleteUser).put(protect, admin, updateUser)

module.exports = router