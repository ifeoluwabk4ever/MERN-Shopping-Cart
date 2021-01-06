import express from 'express'


import Auth from '../Middleware/UserAuth.js'
import AuthAdmin from '../Middleware/AuthAdmin.js'
import CategoryById from '../Middleware/categoryById.js'
import { addNewProduct, editProductbySlugName, getAllProducts, deleteProductbySlugName, getProduct } from '../Controllers/ProductController.js'


const router = express.Router()


router.route('/products')
   .get(getAllProducts)
   .post(Auth, AuthAdmin, CategoryById, addNewProduct)


router.route('/products/:product_slug')
   .get(getProduct)
   .put(Auth, AuthAdmin, CategoryById, editProductbySlugName)
   .delete(Auth, AuthAdmin, deleteProductbySlugName)


export default router