import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, CardFooter, Container } from 'reactstrap'
import { Link } from 'react-router-dom'


import Loading from '../../Utils/Loading'
import { getProducts } from '../../Data/Actions/ProductActions'
import { numberWithCommas } from '../../Utils/Format'
import { Underline1 } from '../../Utils/Underline'


const HomeFeatured = ({ products, isLoading, getProducts }) => {


   useEffect(() => {
      getProducts()
   }, [getProducts])


   // let result = products.reduce((r, a) => {
   //    let key = a.category || 'others'
   //    r[key] = r[key] || []
   //    r[key].push(a)
   //    return r
   // }, [])
   // console.log(result);




   isLoading && <Loading />


   return (
      <Container className="my-4">
         <h1 className="text-center text-uppercase">Featured <span className="title-color">Products</span></h1>
         <Underline1 />
         <div className="product-name my-5">
            {
               products.map(item => (
                  item.featured &&
                  <Card className="featured-product shadow" key={item._id}>
                     <div className="img-container">
                        <img src={`/Images/Uploads/${item.product_image}`} alt={item.product_slug} className="product-img featured-hover" />
                        <Link
                           to={`/products/${item.product_slug}`}
                           className="text-uppercase text-white-50 btn btn-outline-secondary mainLetter featured-product-link"
                        >detail
                           </Link>
                     </div>
                     <CardFooter className="bg-primary text-white text-capitalize featured-product-info">
                        <div className="d-flex align-items-center justify-content-between mainLetter">
                           <h5>{item.product_name}</h5>
                           <h6><span className="text-white-50">Price: $</span>{numberWithCommas(item.price)}</h6>
                        </div>
                     </CardFooter>
                  </Card>
               ))
            }
         </div>
      </Container>
   )
}

const mapStateToProps = state => ({
   isLoading: state.product.isLoading,
   products: state.product.products
})

export default connect(mapStateToProps, { getProducts })(HomeFeatured)
