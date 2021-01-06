import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'
import UserInfoCartList from '../Components/Cart/UserInfoCartList'
import { numberWithCommas } from '../Utils/Format'

export let dateFormat = dob => {
   let val1 = new Date(dob)
   let utc2 = val1.toUTCString().substring(0, 16)
   return utc2
}

const UserInfo = ({ isAuth, user, isAdmin, cartItem }) => {
   const [total, setTotal] = useState(0);

   useEffect(() => {
      let getTotal = () => {
         let total = cartItem.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
         }, 0)
         setTotal(total)
      }
      getTotal()
   }, [cartItem])

   return (
      <Container className="my-5">
         <Card className="shadow">
            <CardHeader className="d-flex justify-content-between align-content-center bg-primary">
               <h1 className="text-capitalize text-white text-center">{user.user.name}</h1>
               {
                  isAdmin && <h1 className="title-color">Admin</h1>
               }
            </CardHeader>
            <div className="p-4 user-info">
               <div>
                  <img src={`/Images/Uploads/${user.user.avatar}`} alt={user.user.name} className="user-info-img shadow" />
                  <Card className="shadow mt-5">
                     <CardHeader className="bg-primary">
                        <h3 className="text-capitalize text-white"> user information</h3>
                     </CardHeader>
                     <CardBody>
                        <ul className="list-group list-group-flush">
                           <li className="list-group-item">
                              <dt>Email:</dt>
                              <dd className="ml-4">{user.user.email}</dd>
                           </li>
                           <li className="list-group-item">
                              <dt>Date of birth:</dt>
                              <dd className="ml-4">{user.user.dob === 'Nil' ? 'Nil...' : dateFormat(user.user.dob)}</dd>
                           </li>
                           <li className="list-group-item">
                              <dt>Telephone Number:</dt>
                              <dd className="ml-4">{user.user.telephone === null ? 'Nil...' : +user.user.telephone}</dd>
                           </li>
                           <li className="list-group-item">
                              <button className="btn btn-info">Edit Info</button>
                           </li>

                        </ul>
                     </CardBody>
                  </Card>
               </div>
               <div>
                  <Card className="shadow mb-4">
                     <CardHeader className="bg-primary">
                        <h3 className="text-capitalize text-white"> payment history</h3>
                     </CardHeader>
                     <CardBody className="d-flex justify-content-center flex-column p-3">
                        <div className="mb-4 w-100">
                           {
                              user.user.history > 0 ?
                                 <Fragment>
                                    <div>
                                       <div className="row text-capitalize border border py-2 text-center">
                                          <h5 className="col">S/N</h5>
                                          <h5 className="col">payment iD</h5>
                                          <h5 className="col">total Amount</h5>
                                          <h5 className="col">veiw detail</h5>
                                       </div>
                                       {
                                          user.user.history.map((item, index) => (
                                             <div className="row text-capitalize border text-center" key={item._id}>
                                                <p className="col">{index}</p>
                                                <p className="col">{item._id}</p>
                                                <p className="col">${item.amount}</p>
                                                <p className="col"><button className="btn btn-outline-info">More</button></p>
                                                <p className="col"><button className="btn btn-outline-info">More</button></p>
                                             </div>
                                          ))
                                       }
                                    </div>
                                 </Fragment>
                                 : <h2 className="text-capitalize text-center mt-3">No payment history yet</h2>
                           }
                        </div>
                     </CardBody>
                  </Card>
                  <Card className="shadow mb-4">
                     <CardHeader className="bg-primary">
                        <h3 className="text-capitalize text-white"> cart detail</h3>
                     </CardHeader>
                     <CardBody className="d-flex justify-content-center flex-column p-3">
                        <div className="mb-4 w-100">
                           <div className="row text-center border py-2">
                              <div className="col text-capitalize my-auto"><h6>s/n</h6></div>
                              <div className="col text-capitalize my-auto"><h6>product name</h6></div>
                              <div className="col text-capitalize my-auto"><h6>product image</h6></div>
                              <div className="col text-capitalize my-auto"><h6>quantity</h6></div>
                              <div className="col text-capitalize my-auto"><h6>Amount/ Total</h6></div>
                           </div>
                           {
                              cartItem.length === 0 ? <h2>No item in Cart</h2>
                                 : cartItem.map((item, index) => (
                                    <UserInfoCartList item={item} index={index} key={item._id} />
                                 ))
                           }
                           <hr className="my-4" />
                           <div className="total d-flex align-items-end flex-column mb-3">
                              <h6 className="text-uppercase mb-3"><span className="text-muted">total: $</span>{numberWithCommas(total.toFixed(2))}</h6>
                              <h6 className="text-uppercase mb-3"><span className="text-muted">vat: $</span>{numberWithCommas((total.toFixed(2) * 0.1).toFixed(2))}</h6>
                              <h6 className="text-uppercase mb-3"><span className="text-muted">sub-total: $</span>{numberWithCommas((Number(total.toFixed(2)) + Number(total.toFixed(2) * 0.1)).toFixed(2))}</h6>
                           </div>
                        </div>
                     </CardBody>
                  </Card>
               </div>
            </div>
         </Card>
      </Container>
   )
}

const mapStateToProps = state => ({
   isAuth: state.auth.isAuthenticated,
   isAdmin: state.auth.isAdmin,
   user: state.auth.user,
   cartItem: state.auth.cart
})

export default connect(mapStateToProps, null)(UserInfo)
