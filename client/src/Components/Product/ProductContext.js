import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../../Data/Actions/ProductActions'
import { getCategories } from '../../Data/Actions/CategoryAction'

const ProductContext = React.createContext()


const ProductProvider = ({ getProducts, products, getCategories, categories, children, cartItem }) => {

   useEffect(() => {
      getProducts()
      getCategories()
   }, [getProducts, getCategories])

   const initialState = {
      allProducts: [],
      maxPrice: 0,
      price: 0,
      minPrice: 0,
      sortedProducts: [],
      company: 'all',
      category: 'all',
      search: '',
      loading: true,
      shipping: false
   }

   const [state, setState] = useState(initialState);
   const [cartTotal, setCartTotal] = useState(0);

   let { company, category, price, maxPrice, minPrice, loading, sortedProducts, allProducts, shipping, search } = state

   useEffect(() => {
      let allProducts = products
      let maxPrice = Math.max(...allProducts.map(item => item.price))
      let minPrice = Math.min(...allProducts.map(item => item.price))
      setState({
         ...state,
         allProducts,
         sortedProducts: allProducts,
         maxPrice,
         minPrice,
         price: maxPrice,
         loading: false
      })
   }, [products])

   useEffect(() => {
      let getTotal = () => {
         let cartTotal = cartItem.length
         setCartTotal(cartTotal)
      }
      getTotal()
   }, [cartItem])

   let handleDataChange = e => {
      const target = e.target;
      const value = target.type === "checkbox" ? target.checked : target.value;
      const name = target.name;

      setState({
         ...state,
         [name]: value
      })
   }

   const filterProducts = () => {

      let tempProducts = [...allProducts]

      // filter by price
      tempProducts.filter(product => product.price <= Number(price));

      // filter by category
      if (category !== "All") tempProducts = tempProducts.filter(product => product.category === category);

      // filter by company name
      if (company !== "All") tempProducts = tempProducts.filter(product => product.company === company);

      // filter through search
      if (search) tempProducts.filter(product => product.product_name.includes(search))

      //filter by shipping
      if (shipping) tempProducts = tempProducts.filter(product => product.shipping === true);

      setState({
         ...state,
         sortedProducts: tempProducts
      })
   }
   useEffect(() => {
      filterProducts()
   }, [])


   return (
      <ProductContext.Provider value={{
         ...state,
         categories,
         cartTotal,
         handleDataChange
      }}>
         {children}
      </ProductContext.Provider>
   )
}


const mapStateToProps = state => ({
   isLoading: state.auth.isLoading,
   cartItem: state.auth.cart,
   products: state.product.products,
   categories: state.category.category
})

const ProductConsumer = ProductContext.Consumer;

export { ProductConsumer, ProductContext };

export function withProductConsumer(Component) {
   return function ConsumerWrapper(props) {
      return (
         <ProductConsumer>
            {value => <Component {...props} context={value} />}
         </ProductConsumer>
      );
   };
}

export default connect(mapStateToProps, { getProducts, getCategories })(ProductProvider)
