import React from 'react'
import { Navbar } from 'reactstrap'


const Footer = () => {
   return (
      <Navbar className="text-white-50 text-capitalize d-flex justify-content-center" dark color="dark">
         <p>CarePoint &copy; Copyright all reserved. <strong className="text-white text-italic">2019 - {new Date().getFullYear()}</strong></p>
      </Navbar>
   )
}

export default Footer
