import React, { useState, useEffect, Fragment } from 'react'
import { BiMinusCircle, BiHeart, HiHeart, BiCart } from 'react-icons/all'
import { Button, Card, CardHeader, Container } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import styled from 'styled-components'


import Loading from '../../Utils/Loading'
import { numberWithCommas } from '../../Utils/Format'

const SingleProductPage = ({ products, isLoading }) => {
   const [detailProduct, setDetailProduct] = useState([]),
      [fav, setFav] = useState(false),
      params = useParams()

   useEffect(() => {
      if (params.slug) {
         products.forEach(product => {
            product.product_slug === params.slug && setDetailProduct(product)
         })
      }
   }, [products, params.slug])
   // if (detailProduct.length === 0) return null

   let { company, uses, product_name, price, dosage, side_effects, description, product_image } = detailProduct


   return (
      <Fragment>
         {
            isLoading && <Loading />
         }
         <FormulaBg className="d-flex justify-content-center align-items-center">
            <h1>{product_name}</h1>
         </FormulaBg>
         <Container className="my-5">
            <Card className="shadow">
               <CardHeader className="d-flex align-items-center justify-content-between bg-primary text-white text-capitalize">
                  <span><h3>{product_name}</h3></span>
                  <div onClick={() => setFav(!fav)} className="fav-btn">
                     {
                        fav ?
                           <HiHeart size={30} /> :
                           <BiHeart size={30} />
                     }
                  </div>
               </CardHeader>
               <img src={`/Images/Uploads/${product_image}`} alt="product_name" className="product-img2" />
               <div className="my-4 mx-5 ">
                  <h5>Description:- </h5>
                  <p className="text-muted">{description}</p>
               </div>
               <div className="my-4 mx-5 product-detail">
                  <div>
                     <h3 className="text-capitalize text-muted">Product Name: <span className="title-color ml-2">{product_name}</span></h3>
                     <h4 className="text-capitalize text-muted">Manufacturer: <span className="title-color ml-2">{company}</span></h4>
                     <h5 className="text-capitalize text-muted">Price: <span className="title-color ml-2">${price ? numberWithCommas(price) : price}</span></h5>
                  </div>
                  <div>
                     <h5>Uses:- </h5>
                     <ul className="list-group list-group-flush">
                        {
                           uses && uses.map((item, index) => {
                              return (
                                 item && <li key={index} className="list-group-item text-capitalize">
                                    <span className="mr-3 title-color"><BiMinusCircle /></span>
                                    {item}
                                 </li>
                              )
                           })
                        }
                     </ul>
                  </div>
                  <div>
                     <h5>Side Effects:- </h5>
                     <ul className="list-group list-group-flush">
                        {
                           side_effects && side_effects.map((item, index) => {
                              return (
                                 item && <li key={index} className="list-group-item text-capitalize">
                                    <span className="mr-3 title-color"><BiMinusCircle /></span>
                                    {item}
                                 </li>
                              )
                           })
                        }
                     </ul>
                  </div>
                  <div>
                     <h5>Dosage:- </h5>
                     <ul className="list-group list-group-flush">
                        {
                           dosage && dosage.map((item, index) => {
                              return (
                                 item && <li key={index} className="list-group-item text-capitalize">
                                    <span className="mr-3 title-color"><BiMinusCircle /></span>
                                    {item}
                                 </li>
                              )
                           })
                        }
                     </ul>
                  </div>
               </div>
               <Button color="info"><BiCart /> <span className="ml-3">Cart Item</span></Button>
            </Card>
         </Container>
      </Fragment>
   )
}

const FormulaBg = styled.div`
   height: 60vh;
   background: linear-gradient(rgba(255, 0, 0, 0.233), rgba(0, 0, 255, 0.247));
   fontSize: 5rem;
   lineSpacing: 0.4rem;
`

const mapStateToProps = state => ({
   isAuth: state.auth.isAuthenticated,
   isLoading: state.auth.isLoading,
   user: state.auth.user,
   products: state.product.products
})

export default connect(mapStateToProps, null)(SingleProductPage)
