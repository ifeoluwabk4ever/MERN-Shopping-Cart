import React, { useState, useEffect } from 'react'
import { Container } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'


import Loading from '../Utils/Loading'
import CartList from '../Components/Cart/CartList'
import { numberWithCommas } from '../Utils/Format'
import { toast } from 'react-toastify'
import PaymentModal from '../Components/Payments/PaymentModal'

const CartPage = ({ cartItem, isLoading }) => {
   const [cart, setCart] = useState(cartItem);
   const [total, setTotal] = useState(0);

   useEffect(() => {
      let getTotal = () => {
         let total = cart.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
         }, 0)
         setTotal(total)
      }
      getTotal()
   }, [cart])

   isLoading && <Loading />

   if (cart.length === 0) return <h1 className="text-capitalize text-center text-muted my-3">Cart currrently empty</h1>

   let addToCart = async cart => {
      await axios.patch('/api/users/addcart', { cart })
   }


   let increment = id => {
      cart.forEach(item => {
         if (item._id === id) {
            item.quantity += 1
         }
      })
      setCart([...cart])
      addToCart(cart)
   }

   let decrement = id => {
      cart.forEach(item => {
         if (item._id === id) {
            item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
         }
      })
      setCart([...cart])
      addToCart(cart)
   }

   let removeCartItem = (id, product) => {
      if (window.confirm(`Do you want to remove ${product} from cart?`)) {
         cart.forEach((item, index) => {
            if (item._id === id) {
               cart.splice(index, 1)
            }
         })
         setCart([...cart])
         addToCart(cart)
         toast.success(`${product} removed from cart`)
      }
   }


   return (
      <Container className="my-5">
         <h1 className="text-center text-black text-capitalize mb-3">my cart</h1>
         <div className="row text-center border py-2">
            <div className="col text-capitalize my-auto"><h6>s/n</h6></div>
            <div className="col text-capitalize my-auto"><h6>product name</h6></div>
            <div className="col text-capitalize my-auto"><h6>product image</h6></div>
            <div className="col text-capitalize my-auto"><h6>quantity</h6></div>
            <div className="col text-capitalize my-auto"><h6>delete item</h6></div>
            <div className="col text-capitalize my-auto"><h6>Amount</h6></div>
            <div className="col text-capitalize my-auto"><h6>total amount</h6></div>
         </div>
         {
            cart.map((item, index) => (
               <CartList item={item} index={index} key={item._id} increment={increment} decrement={decrement} removeCartItem={removeCartItem} />
            ))
         }
         <hr className="my-4" />
         <div className="total d-flex align-items-end flex-column mx-5 mb-3">
            <h2 className="text-uppercase mb-3"><span className="text-muted">total: $</span>{numberWithCommas(total.toFixed(2))}</h2>
            <h2 className="text-uppercase mb-3"><span className="text-muted">vat: $</span>{numberWithCommas((total.toFixed(2) * 0.1).toFixed(2))}</h2>
            <h2 className="text-uppercase mb-3"><span className="text-muted">sub-total: $</span>{numberWithCommas((Number(total.toFixed(2)) + Number(total.toFixed(2) * 0.1)).toFixed(2))}</h2>
            <PaymentModal />
         </div>
      </Container>
   )
}

const mapStateToProps = state => ({
   cartItem: state.auth.cart,
   isLoading: state.auth.isLoading
})

export default connect(mapStateToProps, null)(CartPage)
