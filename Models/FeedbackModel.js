import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema



const FeedbackSchema = new mongoose.Schema({
   user_id: {
      ref: 'user',
      default: null,
      type: ObjectId
   },
   user_name: {
      ref: 'user',
      default: 'Nil',
      type: String,
      trim: true
   },
   message: {
      type: String,
      required: true,
      trim: true
   },
   name: {
      type: String,
      trim: true,
      required: true
   },
   email: {
      type: String,
      required: true,
      trim: true
   },
   telephone: {
      type: Number,
      default: null,
      trim: true
   }
}, { timestamps: true })

export default mongoose.model("Feedback", FeedbackSchema)