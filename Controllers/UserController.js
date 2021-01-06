import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../Models/UserModel.js'



// @route GET /api/users
// @desc Get all users
// @access Private Admin
export const getAllUser = async (req, res) => {
   try {
      let allUser = await User.find().select('-password').sort({ updatedAt: -1 })
      res.json({
         success: true,
         count: allUser.length,
         msg: allUser
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @route   POST /api/users/register
// @desc    Register new user
// @access  Public 
export const addUser = async (req, res) => {
   try {
      let { name, email, password, telephone, dob, avatar } = req.body

      if (!name) return res.status(400).json({
         msg: "Please supply your name"
      })

      if (!email) return res.status(400).json({
         msg: "Email is required"
      })

      if (!password) return res.status(400).json({
         msg: "Password required"
      })

      // Check for existing user
      let user = await User.findOne({ email })
      if (user) return res.status(400).json({
         msg: 'User already exist'
      })

      if (password.length < 6) return res.status(400).json({
         msg: "Password too weak, 6 characters and above"
      })

      let newUser = new User({ name, email, password, telephone, dob, avatar })

      // Create salt && hash
      // Encrypt password
      let salt = await bcrypt.genSalt(10)
      // Save password
      newUser.password = await bcrypt.hash(password, salt)
      // Save data in database
      await newUser.save()

      // Create jwt to auth
      const accesstoken = createAccessToken({ id: newUser._id })

      res.json({
         token: accesstoken,
         msg: `Welcome ${newUser.name}`,
         user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
         }
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}



// @route   POST /api/users/login
// @desc    Login user
// @access  Public
export const loginUser = async (req, res) => {
   try {
      // get email and password from req body
      let { email, password } = req.body

      if (!email) return res.status(400).json({
         msg: "Email required...."
      })

      if (!password) return res.status(400).json({
         msg: "Password required...."
      })

      // Find user
      let user = await User.findOne({ email })

      // If no user in db
      if (!user) {
         return res.status(400).json({
            msg: 'User does not exist...'
         })
      }

      // Know user found by email, comparing password
      let isMatch = await bcrypt.compare(password, user.password)

      // If error
      if (!isMatch) {
         return res.status(400).json({
            msg: 'Invalid password...'
         })
      }

      // If login success, create accesstoken and refreshtoken
      const accesstoken = createAccessToken({ id: user._id })

      res.json({
         token: accesstoken,
         msg: `Welcome ${user.name}`,
         user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
         }
      })
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         msg: error.message
      })
   }
}



// @route   GET /api/users/info
// @desc    Get Each User Information
// @access  Private User
export const getUser = async (req, res) => {
   try {
      let user = await User.findById(req.user.id).select('-password')
      if (!user) return res.status(400).json({
         msg: "User does not exist..."
      })

      res.json({ user })

   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}



// @desc    Add cart to Database
// @route   PATCH /api/users/addcart
// @access  Private User
export const addToCart = async (req, res) => {
   try {
      let user = await User.findById(req.user.id)
      if (!user) return res.status(400).json({
         msg: "User does not exist"
      })
      await User.findByIdAndUpdate({ _id: req.user.id }, {
         cart: req.body.cart
      })
      return res.json({
         msg: `Added to cart`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    Get payment history
// @route   GET /api/users/history
// @access  Private User
export const history = async (req, res) => {
   try {
      let history = await Payment.findOneAndUpdate({ user_id: req.user.id })

      return res.json({
         msg: history
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}

const createAccessToken = user => {
   return jwt.sign(user, process.env.Jwt_Secret, { expiresIn: '2h' })
}