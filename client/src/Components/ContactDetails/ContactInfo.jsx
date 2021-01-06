import React from 'react'
import { BiEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/all'
import Underline from '../../Utils/Underline'

const ContactInfo = () => {
   return (
      <div className="contact-info">
         <h3 className="text-capitalize">contact <span className="title-color">information</span></h3>
         <Underline />
         <div className="row place-items-center my-4">
            <div className="col-4">
               <FaMapMarkerAlt size={30} color="#0d6efd" />
            </div>
            <div className="col-8 text-center">
               <div>
                  <h5>Address 1: (Abuja Branch)</h5>
                  <p className="text-dark">CarePoint city valley, NYC.</p>
               </div>
               <div className="my-5">
                  <h5>Address 2: (Lagos Branch)</h5>
                  <p className="text-dark">CarePoint city valley, NYC.</p>
               </div>
               <div>
                  <h5>Address 3: (Port-Harcourt Branch)</h5>
                  <p className="text-dark">CarePoint city valley, NYC.</p>
               </div>
            </div>
         </div>
         <hr />
         <div className="row place-items-center my-5">
            <div className="col-4">
               <FaPhoneAlt size={30} color="#0d6efd" />
            </div>
            <div className="col-8 text-center">
               <div>
                  <h5>Phone 1: (Abuja Branch)</h5>
                  <p className="text-dark">+234(0) 813 537 3695</p>
               </div>
               <div className="my-5">
                  <h5>Phone 2: (Lagos Branch)</h5>
                  <p className="text-dark">+234(0) 813 537 3695</p>
               </div>
               <div>
                  <h5>Phone 3: (Port-Harcourt Branch)</h5>
                  <p className="text-dark">+234(0) 813 537 3695</p>
               </div>
            </div>
         </div>
         <hr />
         <div className="row place-items-center">
            <div className="col-4">
               <BiEnvelope size={30} color="#0d6efd" />
            </div>
            <div className="col-8 text-center">
               <h5>Mail</h5>
               <p className="text-dark">careadmin@carepoint.com</p>
            </div>
         </div>
      </div>
   )
}

export default ContactInfo
