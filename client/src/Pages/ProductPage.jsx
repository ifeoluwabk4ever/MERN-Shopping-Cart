import React from 'react'
import { Container } from 'reactstrap'

import Loading from '../Utils/Loading'
import ProductFilter from '../Components/Product/ProductFilter'
import { withProductConsumer } from '../Components/Product/ProductContext'
import ProductList from '../Components/Product/ProductList'


const ProductPage = ({ context }) => {
   const { loading, sortedProducts, allProducts } = context;

   if (loading) return <Loading />


   if (allProducts.length === 0) return <h1 className="text-center text-capitalize text-muted my-5">No product file yet</h1>


   return (
      <Container className="my-5">
         <ProductFilter allProducts={allProducts} />
         <ProductList allProducts={sortedProducts} />
      </Container>
   )
}

export default (withProductConsumer(ProductPage))
