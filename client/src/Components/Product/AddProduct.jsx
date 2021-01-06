import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Card, Container, CardHeader, CardBody } from 'reactstrap'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'


import { Loader3 } from '../../Utils/Loading';
import { getCategories } from '../../Data/Actions/CategoryAction'
import { MoonLoader } from 'react-spinners';


let initialState = {
   product_name: '',
   company: '',
   price: '',
   uses: ["Used to cure general disease", "Used to cure general infection"],
   dosage: ["One per day", "Morning and Night"],
   side_effects: ["Slight headache", "Body weakness"],
   description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nesciunt, natus excepturi delectus explicabo nobis, veniam temporibus deleniti nihil quam earum deserunt dignissimos, eum inventore et voluptatibus at dolore ratione.',
   category: ''
}



const AddProduct = ({ categories, isLoading, getCategories, allProduct }) => {
   const [data, setData] = useState(initialState);
   let { company, uses, product_name, price, dosage, side_effects, description, category } = data
   const [images, setImages] = useState(false)
   let [loading, setLoading] = useState(false)
   let [loading2, setLoading2] = useState(false)
   let [product_image, setProduct_Image] = useState('')
   let [addProduct, setAddProduct] = useState([...allProduct])

   useEffect(() => {
      getCategories()
   }, [getCategories])


   let styleUpload = {
      display: images ? "block" : "none"
   }

   let handleUploadImage = async e => {
      e.preventDefault()

      try {
         let file = e.target.files[0]
         if (!file) return toast.error("No Image file included...")
         if (file.size > 1024 * 1024 * 2) return toast.error("File size too large, ~= 2mb...")
         if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') return toast.error("File format unaccepted...")

         product_image = new FormData()
         product_image.append('product_image', file)

         setLoading(true)
         const res = await axios.post(`/api/upload/product-image`, product_image, {
            headers: {
               'content-type': 'multipart/form-data'
            }
         })
         setLoading(false)
         setImages(res.data.msg);
         setProduct_Image(res.data.msg.product_image)
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleDestroyImage = async () => {
      try {

         setLoading(true)
         let res = await axios.post(`/api/destroy/product-image`, { product_path: `./Public/Images/Uploads/${product_image}` })

         setLoading(false)
         setImages(false)
         toast.warning(res.data.msg)
         setProduct_Image('')
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleFileChange = async e => {
      e.preventDefault()
      setLoading2(true)
      try {
         let productData = { company, uses, product_name, price, dosage, side_effects, description, category, product_image }
         let res = await axios.post(`/api/products`, productData)
         setAddProduct([res.data, ...addProduct])
         toast.success(res.data.msg_word)
         setImages(false)
         setProduct_Image('')
         setData(initialState)
         setLoading2(false)
      } catch (error) {
         setLoading2(false)
         let errors = error.response.data.msg
         if (errors) toast.error(errors)
      }
   }


   const handleDataChange = input => e => {
      setData({ ...data, [input]: e.target.value })
   }



   return (
      <Container className="my-4">
         <h1 className="text-center text-uppercase my-3">Add product</h1>
         <div className="category-bar">
            <Card>
               <CardHeader className="bg-primary text-white text-capitalize">
                  <h5>Product image here:</h5>
               </CardHeader>
               <CardBody>
                  <div className="upload mx-auto position-relative p-2">
                     <input
                        className="upload-file"
                        type="file"
                        id="file_up"
                        name="file"
                        onChange={handleUploadImage}
                     />
                     {
                        loading ?
                           <div className="file_img d-flex align-items-center justify-content-center">
                              <Loader3 />
                           </div>
                           : <div className="file_img" style={styleUpload}>
                              <img src={images ? `/Images/Uploads/${product_image}` : ''} alt="product-img" />
                              <div className="faTimes2 faTimes" onClick={handleDestroyImage}>
                                 <FaTimes color="red" size={20} />
                              </div>
                           </div>
                     }
                  </div>
               </CardBody>
            </Card>
            <form onSubmit={handleFileChange}>
               <Card className="shadow">
                  <CardHeader className="bg-primary text-white text-capitalize">
                     <h5>Product details here:</h5>
                  </CardHeader>
                  <CardBody>
                     <div className="form-floating mb-3">
                        <input
                           type="text"
                           className="form-control text-black"
                           id="product_name"
                           placeholder="Product Name"
                           value={product_name}
                           onChange={handleDataChange("product_name")}
                        />
                        <label htmlFor="product_name">Product Name:</label>
                     </div>
                     <div className="form-floating mb-3">
                        <input
                           type="text"
                           className="form-control text-black"
                           id="company"
                           placeholder="Company Name"
                           value={company}
                           onChange={handleDataChange("company")}
                        />
                        <label htmlFor="company">Company Name:</label>
                     </div>
                     <div className="form-floating mb-3">
                        <input
                           type="number"
                           className="form-control text-black"
                           id="price"
                           placeholder="Price"
                           value={price}
                           onChange={handleDataChange("price")}
                        />
                        <label htmlFor="price">Price:</label>
                     </div>
                     <div className="form-floating mb-3">
                        <select
                           className="form-select text-black"
                           id="category"
                           name="category"
                           value={category}
                           onChange={handleDataChange("category")}
                        >
                           <option value="">Choose a category...</option>
                           {
                              categories.map(item => (
                                 <option value={item._id} key={item._id}>{item.name}</option>
                              ))
                           }
                        </select>
                        <label htmlFor="category">Category:</label>
                     </div>
                     <div className="form-floating mb-3">
                        <textarea
                           className="form-control"
                           placeholder="Product description here"
                           id="description"
                           style={{ height: '100px' }}
                           value={description}
                           onChange={handleDataChange("description")}
                        ></textarea>
                        <label htmlFor="description">Description:</label>
                     </div>
                     <div className="form-floating mb-3">
                        <textarea
                           className="form-control"
                           placeholder="Product uses here"
                           id="uses"
                           style={{ height: '100px' }}
                           value={uses}
                           onChange={handleDataChange("uses")}
                        ></textarea>
                        <label htmlFor="uses">Uses:</label>
                     </div>
                     <div className="form-floating mb-3">
                        <textarea
                           className="form-control"
                           placeholder="Product dosage here"
                           id="dosage"
                           style={{ height: '100px' }}
                           value={dosage}
                           onChange={handleDataChange("dosage")}
                        ></textarea>
                        <label htmlFor="description">Dosage:</label>
                     </div>
                     <div className="form-floating mb-3">
                        <textarea
                           className="form-control"
                           placeholder="Product side effects here"
                           id="side_effects"
                           style={{ height: '100px' }}
                           value={side_effects}
                           onChange={handleDataChange("side_effects")}
                        ></textarea>
                        <label htmlFor="description">Side Effects:</label>
                     </div>
                     {
                        loading2 && <MoonLoader size={32} color='#0d6efd' />
                     }
                     {
                        !loading2 &&
                        <button type="submit" className="btn btn-primary text-capitalize">Add product</button>
                     }
                  </CardBody>
               </Card>
            </form>
         </div>
      </Container>
   )
}

const mapStateToProps = state => ({
   isLoading: state.category.isLoading,
   categories: state.category.category,
   allProduct: state.product.products
})

export default connect(mapStateToProps, { getCategories })(AddProduct)