import Product from '../Models/ProductModel.js'



// @route   GET /api/products
// @desc    Get all products
// @access  Public
export const getAllProducts = async (req, res) => {
   try {
      let product = await Product.find().sort({ updatedAt: -1 })

      res.json({
         success: true,
         count: product.length,
         msg: product
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         msg: error.message
      })
   }
}

// @route   GET /products/info
// @desc    Get Each Product Information
// @access  Private Product
export const getProduct = async (req, res) => {
   try {
      let product = await Product.findById(req.product.id)
      if (!product) return res.status(400).json({
         msg: "Product does not exist..."
      })

      res.json({ product })

   } catch (error) {
      return res.status(500).json({
         msg: error.message
      })
   }
}


// @route   POST /api/products
// @desc    Add a new product product
// @access  Private Admin
export const addNewProduct = async (req, res) => {
   try {
      let { company, uses, product_name, price, dosage, side_effects, description, category, product_image } = req.body

      if (!company || !uses || !product_name || !price || !dosage || !side_effects || !description || !category) return res.status(400).json({
         msg: "Please  fill out the necessary fields"
      })

      if (!product_image) return res.status(400).json({
         msg: "Product image image required"
      })

      let newProduct = new Product({ company, uses, product_name, price, dosage, side_effects, description, category, product_image })

      await newProduct.save()
      res.json({
         success: true,
         msg_word: `${product_name} added`,
         msg: {
            id: newProduct.id,
            product_name: product_name,
            company: company,
            price: price
         }
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         msg: error.message
      })
   }
}


// @route   PUT /api/products/:product_slug
// @desc    Edit product detail
// @access  Private Admin
export const editProductbySlugName = async (req, res) => {
   try {
      let { product_slug } = req.params
      console.log(req.params);
      let productId = await Product.findOne({ product_slug })

      if (!productId) return res.status(400).json({
         msg: `Product, ${product_slug} not found`
      })



      let { company, uses, product_name, price, dosage, side_effects, description, category, product_image } = req.body

      if (!company || !uses || !product_name || !price || !dosage || !side_effects || !description || !category) return res.status(400).json({
         msg: "Please  fill out the necessary fields"
      })

      if (!product_image) return res.status(400).json({
         msg: "Product image required"
      })

      await Product.findOneAndUpdate({ product_slug }, { company, uses, product_name, price, dosage, side_effects, description, category, product_image })

      res.json({
         success: true,
         msg: `Product, ${product_slug} updated`
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         msg: error.message
      })
   }
}


// @route   DELETE /api/products/:product_slug
// @desc    Delete product from database
// @access  Private Admin
export const deleteProductbySlugName = async (req, res) => {
   try {
      let { product_slug } = req.params
      console.log(req.params);
      let productId = await Product.findOne({ product_slug })

      if (!productId) return res.status(400).json({
         msg: `Product, ${product_slug} not found`
      })

      let deletedProduct = await Product.findOneAndDelete({ product_slug })
      res.json({
         success: true,
         msg: `Product, ${deletedProduct.product_name} deleted`
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         msg: error.message
      })
   }
}