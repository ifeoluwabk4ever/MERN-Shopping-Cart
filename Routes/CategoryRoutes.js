import express from 'express'

import Auth from '../Middleware/UserAuth.js'
import AuthAdmin from '../Middleware/AuthAdmin.js'
import { createCategory, getCategories, deleteCategory, getCategory, updateCategory } from '../Controllers/CategoryController.js'

const router = express.Router()


router.route('/category')
   .get(getCategories)
   .post(Auth, AuthAdmin, createCategory)


router.route('/category/:category_id')
   .delete(Auth, AuthAdmin, deleteCategory)
   .put(Auth, AuthAdmin, updateCategory)
   .get(Auth, getCategory)


export default router