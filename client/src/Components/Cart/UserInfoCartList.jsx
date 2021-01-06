import React from 'react'
import { numberWithCommas } from '../../Utils/Format'

const UserInfoCartList = ({ item, index }) => {
   return (
      <div className="row text-center border py-2">
         <div className="col text-capitalize my-auto">{index + 1}</div>
         <div className="col text-capitalize my-auto">{item.product_name}</div>
         <div className="col text-capitalize my-auto"><img src={`/Images/Uploads/${item.product_image}`} alt={item.product_name} className="cart-img" /></div>
         <div className="col text-capitalize my-auto">
            <button className="btn btn-secondary">{numberWithCommas(item.quantity)}</button>
         </div>
         <div className="col text-capitalize my-auto">
            <div><h6><span className="text-muted">$</span>{numberWithCommas(item.price.toFixed(2))}</h6></div>
            <div><h6><span className="text-muted">$</span>{numberWithCommas((item.price * item.quantity).toFixed(2))}</h6></div>
         </div>
      </div>
   )
}

export default UserInfoCartList
