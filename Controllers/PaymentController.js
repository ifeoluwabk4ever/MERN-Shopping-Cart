import Payment from '../Models/PaymentModel.js'
import User from '../Models/UserModel.js'
import Product from '../Models/ProductModel.js'


// @desc    Get payment details
// @route   GET /api/payment
// @access  Private Admin
export const getPayments = async (req, res) => {
   try {
      let payment = await Payment.find()
      res.json({
         msg: payment
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    Add payment to Databse
// @route   POST /api/payment
// @access  Private User
export const createPayment = async (req, res) => {
   try {
      let user = await User.findById({ _id: req.user.id }).select(' name email')
      if (!user) return res.status(400).json({
         msg: "User does not exist"
      })

      let { cart, paymentID, address } = req.body,
         { _id, name, email } = user

      const newPayment = new Payment({
         cart, paymentID, address, user_id: _id, name, email
      })

      cart.filter(item => {
         return sold(item._id, item.quantity, item.sold)
      })

      await newPayment.save()
      res.json({
         msg: `Payment ${paymentID} successfull`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}

const sold = async (id, quantity, oldSold) => {
   await Product.findOneAndUpdate({ _id: id }, {
      sold: quantity + oldSold
   })
}
