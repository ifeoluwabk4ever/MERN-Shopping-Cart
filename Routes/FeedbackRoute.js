import express from 'express'

import User from '../Models/UserModel.js'
import AuthAdmin from '../Middleware/AuthAdmin.js'
import Auth from '../Middleware/UserAuth.js'
import Feedback from '../Models/FeedbackModel.js'

const router = express.Router()


router.route('/feedback')
   .get(Auth, AuthAdmin, async (req, res) => {
      try {
         let allFeedbacks = await Feedback.find().sort({ updatedAt: -1 })
         res.json({
            success: true,
            count: allFeedbacks.length,
            msg: allFeedbacks
         })
      } catch (error) {
         return res.status(500).json({
            success: false,
            msg: error.message
         })
      }
   })
   .post(async (req, res) => {
      try {
         let { name, email, telephone, message } = req.body

         if (!name) return res.status(400).json({
            msg: "Name is required"
         })
         if (!email) return res.status(400).json({
            msg: "Email is required"
         })
         if (!message) return res.status(400).json({
            msg: "Message is required"
         })

         let user = await User.findOne({ email })
         if (user) {
            var user_id = user._id
            var user_name = user.name
         }
         let detail = { name, email, telephone, message, user_id, user_name }
         let newMessage = new Feedback(detail)
         await newMessage.save()
         res.json({
            success: true,
            msg: `Thank you for contacting us ${name},... \n We will get back to you`
         })
      } catch (error) {
         return res.status(500).json({
            success: false,
            msg: error.message
         })
      }
   })


export default router