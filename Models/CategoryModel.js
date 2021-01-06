import mongoose from 'mongoose'
import slug from 'mongoose-slug-generator'


mongoose.plugin(slug)

const CategorySchema = new mongoose.Schema({
   name: {
      type: String,
      trim: true,
      required: true,
      unique: true
   },
   category_id: {
      type: String,
      slug: 'name',
      unique: true,
      slug_padding_size: 2
   }
},
   {
      timestamps: true
   }
)

export default mongoose.model('Category', CategorySchema)