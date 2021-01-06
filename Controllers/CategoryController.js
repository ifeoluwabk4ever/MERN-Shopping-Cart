import Category from '../Models/CategoryModel.js'


// @desc    Get all Categories
// @route   GET /api/category
// @access  Public
export const getCategories = async (req, res) => {
   try {
      let categories = await Category.find().sort({ updatedAt: -1 })
      res.json({
         success: true,
         count: categories.length,
         msg: categories
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    Create Categories
// @route   POST /api/category
// @access  Private Admin
export const createCategory = async (req, res) => {
   try {
      let { category } = req.body

      if (!category) return res.status(400).json({
         msg: "Category name required..."
      })

      let checkCategory = await Category.findOne({ name: category })

      if (checkCategory) return res.status(400).json({
         msg: `Category, '${category}' exist...`
      })

      let newCategory = new Category({ name: category })
      await newCategory.save()
      res.json({
         msg: `Category, '${category}' created...`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    Delete Category
// @route   DELETE /api/category/:categoryId
// @access  Private Admin
export const deleteCategory = async (req, res) => {
   try {
      let { category_id } = req.params
      let findCategory = await Category.findOne({ category_id })
      if (!findCategory) return res.status(400).json({
         msg: `Category ${category_id} not found`
      })

      await Category.findOneAndDelete({ category_id })
      res.json({
         msg: `Category ${category_id} deleted`
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    Update Category
// @route   PUT /api/category/:category_id
// @access  Private Admin
export const updateCategory = async (req, res) => {
   try {
      let { category_id } = req.params
      let findCategory = await Category.findOne({ category_id })
      if (!findCategory) return res.status(400).json({
         msg: `Category ${category_id} not found`
      })

      let { name } = req.body
      if (!name) return res.json({
         msg: "Please provided what to update with???"
      })
      await Category.findOneAndUpdate({ category_id }, { name })
      res.json({
         msg: `Category ${name} updated`,
         findCategory,
         name
      })
   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @desc    Get single category by Id
// @route   PUT /api/category/:category_id
// @access  Private Admin
export const getCategory = async (req, res) => {
   let { category_id } = req.params
   let findCategory = await Category.findOne({ category_id })
   if (!findCategory) return res.status(400).json({
      msg: `Category ${category_id} not found`
   })
   res.json({
      msg: findCategory
   })
}