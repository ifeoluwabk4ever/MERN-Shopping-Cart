import React from 'react'
import { BiEnvelope, BsClock, FaPhoneAlt } from 'react-icons/all'
import { Container, Navbar } from 'reactstrap'

const HeadersContact = () => {
   return (
      <div className="d-none d-lg-block">
         <Navbar>
            <Container className="d-flex justify-content-between contact-top">
               <div className="d-flex align-items-center navList2">
                  <BiEnvelope color="#031a3d" />
                  <cite className="ml-4">careadmin@carepoint.com</cite>
               </div>
               <div className="d-flex align-items-center navList2">
                  <BsClock color="#031a3d" />
                  <cite className="ml-4">08:00-17:30 weekdays</cite>
               </div>
               <div className="d-flex align-items-center navList2">
                  <FaPhoneAlt color="#031a3d" />
                  <cite className="ml-4">+234(0) 813 537 3695</cite>
               </div>
            </Container>
         </Navbar>
      </div>
   )
}

export default HeadersContact
