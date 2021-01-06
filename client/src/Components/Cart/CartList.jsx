import React from 'react'
import { BiMinus, BiPlus, BiTrash } from 'react-icons/all'
import { numberWithCommas } from '../../Utils/Format'

const CartList = ({ item, index, increment, decrement, removeCartItem }) => {
   return (
      <div className="row text-center border py-2">
         <div className="col text-capitalize my-auto">{index + 1}</div>
         <div className="col text-capitalize my-auto"><h5>{item.product_name}</h5></div>
         <div className="col text-capitalize my-auto"><img src={`/Images/Uploads/${item.product_image}`} alt={item.product_name} className="cart-img" /></div>
         <div className="col text-capitalize my-auto">
            <div className="btn btn-group">
               <button
                  className="btn btn-outline-secondary"
                  onClick={() => decrement(item._id)}
               ><BiMinus /></button>
               <button className="btn btn-secondary">{numberWithCommas(item.quantity)}</button>
               <button
                  className="btn btn-outline-secondary"
                  onClick={() => increment(item._id)}
               ><BiPlus /></button>
            </div>
         </div>
         <div className="col text-capitalize my-auto">
            <button
               className="btn btn-danger"
               onClick={() => removeCartItem(item._id, item.product_name)}
            ><BiTrash /></button>
         </div>

         <div className="col text-capitalize my-auto"><h6><span className="text-muted">$</span>{numberWithCommas(item.price.toFixed(2))}</h6></div>
         <div className="col text-capitalize my-auto"><h6><span className="text-muted">$</span>{numberWithCommas((item.price * item.quantity).toFixed(2))}</h6></div>
      </div>
   )
}

export default CartList
