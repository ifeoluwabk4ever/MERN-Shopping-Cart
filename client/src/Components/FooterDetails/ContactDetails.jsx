import React from 'react'
import { BiEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/all'

const ContactDetails = () => {
   return (
      <>
         <h2 className="mb-5">Contact Detail</h2>
         <div className="row place-items-center">
            <div className="col-4">
               <FaMapMarkerAlt size={30} />
            </div>
            <div className="col-8 text-center">
               <h3>Address</h3>
               <p>CarePoint city valley, NYC.</p>
            </div>
         </div>
         <div className="row place-items-center my-3">
            <div className="col-4">
               <FaPhoneAlt size={30} />
            </div>
            <div className="col-8 text-center">
               <h3>Phone</h3>
               <p>+234(0) 813 537 3695</p>
            </div>
         </div>
         <div className="row place-items-center">
            <div className="col-4">
               <BiEnvelope size={30} />
            </div>
            <div className="col-8 text-center">
               <h3>Mail</h3>
               <p>careadmin@carepoint.com</p>
            </div>
         </div>
      </>
   )
}

export default ContactDetails
