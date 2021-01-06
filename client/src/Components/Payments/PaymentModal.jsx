import React, { useState } from 'react'
// import { toast } from 'react-toastify'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
// import { connect } from 'react-redux'
// import { MoonLoader } from 'react-spinners'
import { BiCreditCard, BiCreditCardFront, BiTransfer, CgCreditCard, CgPaypal, FaMoneyBillWaveAlt, MdPayment, RiPaypalLine, SiPaypal } from 'react-icons/all'

const PaymentModal = () => {

   let [modal, setModal] = useState(false)

   let toggle = () => {
      setModal(!modal)
   }

   return (
      <div>
         <button
            onClick={toggle}
            className="btn btn-warning text-uppercase"
         >Checkout</button>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle} className="text-uppercase"> Payment portal </ModalHeader>
            <ModalBody>
               <p className="text-right text-muted mainLetter">Please choose your payment mode...</p>
               <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                     <div>
                        <h5 className="text-capitalize title-color">Credit Card</h5>
                        <div className="btn-group my-1">
                           <button className="btn btn-light"><BiCreditCard size={24} /></button>
                           <button className="btn btn-light"><BiCreditCardFront size={24} /></button>
                           <button className="btn btn-light"><CgCreditCard size={24} /></button>
                        </div>
                     </div>
                  </li>
                  <li className="list-group-item">
                     <div>
                        <h5 className="text-capitalize title-color">Paypal</h5>
                        <div className="btn-group my-1">
                           <button className="btn btn-light"><CgPaypal size={24} /></button>
                           <button className="btn btn-light"><SiPaypal size={24} /></button>
                           <button className="btn btn-light"><RiPaypalLine size={24} /></button>
                        </div>
                     </div>
                  </li>
                  <li className="list-group-item">
                     <div>
                        <h5 className="text-capitalize title-color">Money gram</h5>
                        <div className="btn-group my-1">
                           <button className="btn btn-light"><FaMoneyBillWaveAlt size={24} /></button>
                           <button className="btn btn-light"><BiTransfer size={24} /></button>
                           <button className="btn btn-light"><MdPayment size={24} /></button>
                        </div>
                     </div>
                  </li>
               </ul>
            </ModalBody>
         </Modal>
      </div>
   )
}

export default PaymentModal
