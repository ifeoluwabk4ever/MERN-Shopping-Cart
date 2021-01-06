import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'
import img1 from '../../../Images/bg1.jpg'
import img2 from '../../../Images/bg2.jpg'
import img3 from '../../../Images/bg3.jpg'

const HomeSponsors = () => {
   return (
      <>
         <h1 className="pt-3 text-center text-capitalize">our <span className="title-color">sponsors</span></h1>
         <Container>
            <div className="p-3 d-flex justify-content-evenly">
               <Link to="#" className="sponsor-link">
                  <img src={img1} alt="sponsor1" className="sponsor-img" /
                  ></Link>
               <Link to="#" className="sponsor-link">
                  <img src={img2} alt="sponsor2" className="sponsor-img" />
               </Link>
               <Link to="#" className="sponsor-link">
                  <img src={img3} alt="sponsor3" className="sponsor-img" />
               </Link>
            </div>
         </Container>
      </>
   )
}

export default HomeSponsors
