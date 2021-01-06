import dotenv from 'dotenv'
dotenv.config({
   path: './Config/config.env'
})
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import path from 'path'


// File Imports
import connectDB from './Config/Db.js'
import UserRoute from './Routes/UserRoutes.js'
import CategoryRoute from './Routes/CategoryRoutes.js'
import ProductRoute from './Routes/ProductRoutes.js'
import ImageRoute from './Routes/ImageUpload.js'
import PaymentRoute from './Routes/PaymentRoute.js'
import FeedbackRoute from './Routes/FeedbackRoute.js'


const app = express()
const __dirname = path.resolve()


app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())
// Set Public Folder
app.use(express.static(path.join(__dirname, 'Public')))


// Routes
app.use('/api/users', UserRoute)
app.use('/api', CategoryRoute)
app.use('/api', ProductRoute)
app.use('/api', ImageRoute)
app.use('/api', PaymentRoute)
app.use('/api', FeedbackRoute)


app.use((req, res) => {
   res.status(400).json({
      msg: `Page not found`
   })
})


const PORT = process.env.PORT || process.env.PORT_NUMBER


connectDB().then(() => {
   app.listen(PORT, () => {
      console.log(`Server running on localhost:${PORT}`.white.bgBlue.dim);
   })
})