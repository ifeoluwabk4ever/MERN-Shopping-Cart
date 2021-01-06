import React, { useState } from 'react'
import { Container } from 'reactstrap'


import AboutGallery from '../Components/AboutDetails/AboutGalerry';
import AboutHistory from '../Components/AboutDetails/AboutHistory';
import AboutInfo from '../Components/AboutDetails/AboutInfo';
import AboutMission from '../Components/AboutDetails/AboutMission';

const AboutPage = () => {
   const [about, setAbout] = useState(true);
   const [history, setHistory] = useState(false);
   const [mission, setMission] = useState(false);
   const [gallery, setGallery] = useState(false);

   const aboutChange = () => {
      setAbout(true)
      setHistory(false)
      setMission(false)
      setGallery(false)
   }

   const historyChange = () => {
      setAbout(false)
      setHistory(true)
      setMission(false)
      setGallery(false)
   }

   const missionChange = () => {
      setAbout(false)
      setHistory(false)
      setMission(true)
      setGallery(false)
   }

   const galleryChange = () => {
      setAbout(false)
      setHistory(false)
      setMission(false)
      setGallery(true)
   }


   return (
      <>
         <div className="about-us d-flex justify-content-center align-content-center">
            <div className="m-auto p-4 opac">
               <h1 className="text-center text-capitalize my-4 text-white">About <span className="title-color">us</span></h1>
               <h5 className="text-capitalize">Home <span className="text-success">&gt;&gt; About us</span></h5>
            </div>
         </div>
         <Container>
            <hr />
            <div className="btn-group about-btn">
               <button
                  className={`text-capitalize btn ${about ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={aboutChange}
               >About us</button>
               <button
                  className={`text-capitalize btn ${history ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={historyChange}
               >Our history</button>
               <button
                  className={`text-capitalize btn ${mission ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={missionChange}
               >Vision & Mission Statement</button>
               <button
                  className={`text-capitalize btn ${gallery ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={galleryChange}
               >Gallery</button>
            </div>
            {
               about && <AboutInfo />
            }
            {
               history && <AboutHistory />
            }
            {
               mission && <AboutMission />
            }
            {
               gallery && <AboutGallery />
            }
         </Container>
      </>
   )
}

export default AboutPage
