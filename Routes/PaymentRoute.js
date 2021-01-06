import express from 'express'
import { getPayments, createPayment } from '../Controllers/PaymentController.js'
import Auth from '../Middleware/UserAuth.js'
import AuthAdmin from '../Middleware/AuthAdmin.js'

const router = express.Router()

router.route('/payment')
   .get(Auth, AuthAdmin, getPayments)
   .post(Auth, createPayment)

export default router