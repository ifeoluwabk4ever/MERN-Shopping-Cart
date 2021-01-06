import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BiBriefcase, FaLaptopMedical, GiMedicines, GiStethoscope } from 'react-icons/all'

import { Underline1 } from '../../Utils/Underline'

const HomeServices = () => {

   const servicesRender = [
      {
         id: uuidv4(),
         icon: <GiStethoscope />,
         name: 'treatment',
         desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates natus quidem ea dolore id quisquam dicta? Suscipit quibusdam maiores ducimus.'
      },
      {
         id: uuidv4(),
         icon: <FaLaptopMedical />,
         name: 'medical facility',
         desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates natus quidem ea dolore id quisquam dicta? Suscipit quibusdam maiores ducimus.'
      },
      {
         id: uuidv4(),
         icon: <BiBriefcase />,
         name: 'care',
         desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates natus quidem ea dolore id quisquam dicta? Suscipit quibusdam maiores ducimus.'
      },
      {
         id: uuidv4(),
         icon: <GiMedicines />,
         name: 'drugs',
         desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates natus quidem ea dolore id quisquam dicta? Suscipit quibusdam maiores ducimus.'
      },
   ]
   return (
      <div className="main-home-services">
         <h1 className="pt-3 text-center text-uppercase">Services  <span className="title-color">rendered</span></h1>
         <Underline1 />
         <div className="home-services">
            {
               servicesRender.map(item => (
                  <div key={item.id} className="p-3">
                     <span>{item.icon}</span>
                     <h4 className="text-capitalize my-2">{item.name}</h4>
                     <p className="text-muted">{item.desc}</p>
                  </div>
               ))
            }
         </div>
      </div>
   )
}

export default HomeServices
