import React, { useState } from 'react'
import { BiCart, BiDetail, BiEdit, BiTrashAlt, FaCartPlus } from 'react-icons/all'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MoonLoader } from 'react-spinners'


import { deleteProduct } from '../../Data/Actions/ProductActions'
import { numberWithCommas } from '../../Utils/Format'
import Loading from '../../Utils/Loading'

const Products = ({ product, isAdmin, deleteProduct, isAuth, cartItem, isLoading, user }) => {

   const [callback, setCallback] = useState(false);
   const [loading, setLoading] = useState(false);

   isLoading && <Loading />

   let { product_name, product_image, price, product_slug } = product

   let deleteThisProduct = async (product_slug, product_name) => {
      if (window.confirm(`Do you want to remove ${product_name} from products?`)) {
         await axios.post(`/api/destroy/product-image`, { product_path: `./Public/Images/Uploads/${product_image}` })
         deleteProduct(product_slug)
      }
   }

   if (isAuth && user) {
      var inCart = user.user.cart.map(item => {
         return item
      })
   }


   let addProductToCart = async product => {
      try {
         setLoading(true)
         if (!isAuth) {
            setLoading(false)
            return toast.error('Please login to add item to cart')
         }
         let check = cartItem.every(item => {
            return item._id !== product._id
         })
         if (check) {
            let addItem = { ...product, quantity: 1, inCart: true }

            await axios.patch('/api/users/addcart', { cart: [...cartItem, addItem] })

            toast.success(`${product.product_name} added to cart`)
            cartItem.push(addItem)
            setCallback(!callback)
            setLoading(false)
         } else {
            toast.error(`${product.product_name} already in cart`)
         }
      } catch (error) {
         setLoading(false)
         console.log(error.response.data.msg)
         toast.error(error.response.data.msg)
      }
   }


   return (
      <Card className="shadow">
         <CardHeader className="bg-primary text-white text-capitalize">
            <h5>{product_name}</h5>
         </CardHeader>
         <img src={`/Images/Uploads/${product_image}`} alt={product_slug} className="product-img" />
         <CardBody className="my-1">
            <div className="d-flex align-items-center justify-content-between">
               <h6 className="text-muted">Price: <span className="title-color text-uppercase">${price ? numberWithCommas(price) : price}</span></h6>
            </div>
         </CardBody>
         {
            isAdmin ?
               <div className="btn-group">
                  <Link
                     className="btn btn-primary text-capitalize"
                     to={`/products/${product_slug}`}
                  ><BiDetail /> detail</Link>
                  <Link
                     to={`/edit-product/${product_slug}`}
                     className="btn btn-info text-capitalize"
                  ><BiEdit /> edit</Link>
                  <button
                     className="btn btn-danger text-capitalize"
                     onClick={() => deleteThisProduct(product_slug, product_name)}
                  ><BiTrashAlt /> Delete</button>
               </div>
               : <div className="btn-group">
                  <Link
                     to={`/products/${product_slug}`}
                     className="btn btn-primary text-capitalize"
                  ><BiDetail /> details</Link>
                  {
                     loading ?
                        <div className="btn btn-light d-flex justify-content-center">
                           <MoonLoader size={24} color="#0d6efd" />
                        </div> :
                        <>
                           {
                              isAuth && inCart.find(item => item._id === product._id) ?
                                 <button
                                    disabled="disabled"
                                    className="btn btn-info text-capitalize"
                                 ><BiCart /> In cart</button>
                                 :
                                 <button
                                    className="btn btn-info text-capitalize"
                                    onClick={() => addProductToCart(product)}
                                 ><FaCartPlus /> cart item</button>
                           }
                        </>
                  }
               </div>
         }
      </Card>
   )
}

const mapStateToProps = state => ({
   isAdmin: state.auth.isAdmin,
   cartItem: state.auth.cart,
   user: state.auth.user,
   isLoading: state.auth.isLoading,
   isAuth: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { deleteProduct })(Products)
