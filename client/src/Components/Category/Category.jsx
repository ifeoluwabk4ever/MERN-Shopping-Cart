import React from 'react'
import { Container } from 'reactstrap'
import CategoryList from './CategoryList'
import CategoryModal from './CategoryModal'

const Category = () => {

   return (
      <Container className="my-5">
         <h1 className="title-color text-center text-uppercase">Category</h1>
         <div>
            <CategoryModal />
            <CategoryList />
         </div>
      </Container>
   )
}


export default Category
