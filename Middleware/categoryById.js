import mongoose from 'mongoose'

import Category from '../Models/CategoryModel.js'

const CategoryById = async (req, res, next) => {
   let { category } = req.body

   if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(403).json({
         msg: 'Category not related...'
      })
   }

   try {
      let findCategory = await Category.findById(category)

      if (!findCategory) {
         return res.status(403).json({
            msg: 'Category does not exist in database'
         })
      }

      req.category = findCategory
      next()
   } catch (error) {
      console.log(error.message);
      res.status(500).json({
         msg: error.message
      })
   }
}

export default CategoryById