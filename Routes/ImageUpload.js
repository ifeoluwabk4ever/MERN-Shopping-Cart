import express from 'express'
import multer from 'multer'
import fs from 'fs'

const router = express.Router()


const storage = multer.diskStorage({
   // Where to store the files
   destination: (req, file, callback) => {
      callback(null, './Public/Images/Uploads')
   },
   // Add filename
   filename: (req, file, callback) => {
      callback(null, Date.now() + file.originalname)
   }
})


// Upload Parameters for multer
const upload = multer({
   storage,
   limits: {
      fieldSize: 1024 * 1024 * 2
   }
})



router.route('/upload/profile-picture')
   .post(upload.single('avatar'), async (req, res) => {
      try {
         let file1 = req.file


         if (file1.size > 1024 * 1024 * 2) {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File size exceeds limit of 2mb, ${file1.size}...`
            })
         }
         if (file1.mimetype !== 'image/jpeg' && file1.mimetype !== 'image/jpg' && file1.mimetype !== 'image/png') {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File format not supported, ${file1.mimetype}...`
            })
         }

         res.json({
            msg: {
               avatar: file1.filename
            }
         })
      } catch (error) {
         res.status(500).json({
            msg: error.message
         })
      }
   })

router.route('/upload/product-image')
   .post(upload.single('product_image'), async (req, res) => {
      try {
         console.log(req.file);
         let file1 = req.file


         if (file1.size > 1024 * 1024 * 2) {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File size exceeds limit of 2mb, ${file1.size}...`
            })
         }
         if (file1.mimetype !== 'image/jpeg' && file1.mimetype !== 'image/jpg' && file1.mimetype !== 'image/png') {
            removeTmp(`${file1.destination}/${file1.filename}`)
            return res.status(400).json({
               msg: `File format not supported, ${file1.mimetype}...`
            })
         }

         res.json({
            msg: {
               product_image: file1.filename
            }
         })
      } catch (error) {
         res.status(500).json({
            msg: error.message
         })
      }
   })


router.route('/destroy/profile-picture')
   .post(async (req, res) => {
      let { avatar_path } = req.body

      if (!avatar_path) return res.status(400).json({
         msg: "No image file selected"
      })

      removeTmp(avatar_path)
      res.json({
         msg: "Profile picture deleted"
      })
   })

router.route('/destroy/product-image')
   .post(async (req, res) => {
      let { product_path } = req.body

      if (!product_path) return res.status(400).json({
         msg: "No image file selected"
      })

      removeTmp(product_path)
      res.json({
         msg: "Product Image deleted"
      })
   })

const removeTmp = filename => {
   fs.unlink(filename, err => {
      if (err) throw err
   })
}

export default router