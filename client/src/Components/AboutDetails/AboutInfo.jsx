import React from 'react'
import { FaAngleDoubleRight, FaPrescription } from 'react-icons/fa'
import Underline from '../../Utils/Underline'

const AboutInfo = () => {
   return (
      <div className="p-4">
         <h1 className="text-capitalize">About <span className="title-color">carePoint</span></h1>
         <Underline />
         <p className="text-muted mt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquid quos rerum voluptatem inventore totam, nihil optio labore dolor earum deleniti sed animi blanditiis saepe praesentium accusamus recusandae hic. Odio, minima, consequatur iure maxime nesciunt tempore explicabo libero possimus, ea nulla officiis quaerat aspernatur reprehenderit voluptates labore mollitia adipisci corrupti harum voluptas assumenda laudantium facere? Recusandae eius asperiores tempore illo illum esse nihil perspiciatis ratione! Minima dolores ut veniam quisquam voluptatem nihil nobis placeat, commodi nisi inventore incidunt magni asperiores reprehenderit eos quae impedit facilis eius dignissimos maiores molestias praesentium odio doloribus perspiciatis. Omnis aliquid distinctio laudantium excepturi perspiciatis nostrum voluptates voluptatibus veritatis quam dolor, eum doloremque praesentium error animi labore reprehenderit placeat. Sint maiores dolorem hic rem odio? Quisquam optio sapiente, dolor, modi laborum esse eveniet excepturi unde incidunt quod eum? Veniam neque pariatur ad commodi nam illo in libero ducimus fugiat distinctio odit velit soluta similique id incidunt itaque aperiam labore provident blanditiis laudantium, est tempora vel! Tempore nostrum blanditiis inventore recusandae impedit, eius quidem, quia nobis est at consequuntur libero sit ab unde aliquid. Quo, at vero asperiores qui nesciunt laudantium cum aliquid possimus ea alias. Magni repudiandae est perspiciatis tempora perferendis sint itaque quae deserunt repellat maiores.
               </p>
         <div className="my-4">
            <h3 className="text-capitalize">staff <span className="title-color">strength</span></h3>
            <Underline />
            <ul className="list-group list-group-flush mt-3">
               <li className="list-group-item text-capitalize d-flex justify-content-between align-items-center">
                  <span>
                     <span className="mr-3 title-color"><FaPrescription /></span> Scientist</span>
                  <span className="badge bg-primary rounded-pill">750</span>
               </li>
               <li className="list-group-item text-capitalize d-flex justify-content-between align-items-center">
                  <span>
                     <span className="mr-3 title-color"><FaPrescription /></span> pharmacists</span>
                  <span className="badge bg-primary rounded-pill">400</span>
               </li>
               <li className="list-group-item text-capitalize d-flex justify-content-between align-items-center">
                  <span>
                     <span className="mr-3 title-color"><FaPrescription /></span> medical doctors</span>
                  <span className="badge bg-primary rounded-pill">250</span>
               </li>
               <li className="list-group-item text-capitalize d-flex justify-content-between align-items-center">
                  <span>
                     <span className="mr-3 title-color"><FaPrescription /></span> nurses</span>
                  <span className="badge bg-primary rounded-pill">550</span>
               </li>
               <li className="list-group-item text-capitalize d-flex justify-content-between align-items-center">
                  <span>
                     <span className="mr-3 title-color"><FaPrescription /></span> others</span>
                  <span className="badge bg-primary rounded-pill">2500</span>
               </li>
            </ul>
         </div>
         <div className="my-4">
            <h3 className="text-capitalize">what <span className="title-color">we do</span></h3>
            <Underline />
            <ul className="list-group list-group-flush mt-3">
               <li className="list-group-item text-capitalize"><span className="mr-3 title-color"><FaAngleDoubleRight /></span> manufacture products</li>
               <li className="list-group-item text-capitalize"><span className="mr-3 title-color"><FaAngleDoubleRight /></span> Enhances human capacity through products</li>
               <li className="list-group-item text-capitalize"><span className="mr-3 title-color"><FaAngleDoubleRight /></span> produce adaptive pills</li>
               <li className="list-group-item text-capitalize"><span className="mr-3 title-color"><FaAngleDoubleRight /></span> apt response to adverse effect on man</li>
               <li className="list-group-item text-capitalize"><span className="mr-3 title-color"><FaAngleDoubleRight /></span> consistency in the pharmaticeucal industry</li>
            </ul>
         </div>
      </div>
   )
}

export default AboutInfo
