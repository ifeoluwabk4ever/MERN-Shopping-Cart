import express from 'express'


import { addToCart, addUser, getAllUser, getUser, history, loginUser } from '../Controllers/UserController.js'
import Auth from '../Middleware/UserAuth.js'
import AuthAdmin from '../Middleware/AuthAdmin.js'


const router = express.Router()


// @route   GET /api/user
// @desc    Get all users
// @access  Private Admin 
router.get('/all-users', Auth, AuthAdmin, getAllUser)

router.post('/register', addUser)

router.post('/login', loginUser)

router.get('/info', Auth, getUser)

router.patch('/addcart', Auth, addToCart)

router.get('/history', Auth, history)


export default router