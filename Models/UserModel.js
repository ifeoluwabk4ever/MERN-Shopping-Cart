import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'


mongoose.plugin(slug)

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true,
   },
   slug: {
      type: String,
      slug: 'name',
      unique: true,
      slug_padding_size: 2
   },
   email: {
      type: String,
      trim: true,
      unique: true,
      required: true
   },
   password: {
      type: String,
      trim: true,
      required: true,
      minlength: 6
   },
   telephone: {
      type: String,
      default: null
   },
   dob: {
      type: Date,
      default: 'Nil'
   },
   cart: {
      type: Array,
      default: []
   },
   avatar: {
      type: String,
      default: "avatar3.jpg"
   },
   role: {
      type: Number,
      default: 0
   },
   history: {
      type: Array,
      default: []
   }
},
   {
      timestamps: true
   }
)

export default mongoose.model('User', UserSchema)