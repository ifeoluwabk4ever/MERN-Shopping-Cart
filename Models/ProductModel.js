import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'

mongoose.plugin(slug)
const { ObjectId } = mongoose.Schema

const ProductSchema = new mongoose.Schema({
   product_slug: {
      type: String,
      slug: 'product_name',
      unique: true
   },
   product_name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200
   },
   company: {
      type: String,
      required: true,
      trim: true
   },
   price: {
      type: Number,
      required: true,
      trim: true
   },
   dosage: {
      type: [String],
      required: true
   },
   side_effects: {
      type: [String],
      required: true
   },
   description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
   },
   uses: {
      type: [String],
      trim: true,
      required: true,
      maxlength: 2000,
   },
   product_image: {
      type: String,
      required: true
   },
   category: {
      type: ObjectId,
      ref: 'Category',
      required: true
   },
   delivery: {
      type: Boolean,
      default: true,
   },
   sold: {
      type: Number,
      default: 0
   },
   likeCount: {
      type: Number,
      default: 0
   },
   userLike: {
      type: Boolean,
      default: false
   },
   featured: {
      type: Boolean,
      default: false
   }
},
   { timestamps: true }
)

export default mongoose.model('Product', ProductSchema)