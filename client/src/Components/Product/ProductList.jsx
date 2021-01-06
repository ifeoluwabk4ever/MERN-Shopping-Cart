import React from 'react'
import Products from './Products'

const ProductList = ({ allProducts }) => {
   if (allProducts.length === 0) return <h1 className="text-center text-capitalize text-muted">unfortunately no product matched your search parameters</h1>

   return (
      <div className="product-name">
         {
            allProducts.map(product => (
               <Products product={product} key={product._id} />
            ))
         }
      </div>
   )
}

export default ProductList
