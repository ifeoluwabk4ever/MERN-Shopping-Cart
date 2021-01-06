import React, { useEffect, useState } from 'react'
import { BiEditAlt, BiMinusCircle, BiTrashAlt } from 'react-icons/all'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader } from 'reactstrap'


import { deleteCategory, getCategories, editCategory } from '../../Data/Actions/CategoryAction'
import { Loader4 } from '../../Utils/Loading'



const CategoryList = ({ getCategories, deleteCategory, category, isLoading, editCategory, isValid }) => {
   const [categories, setCategories] = useState('');
   const [categoryID, setCategoryID] = useState('');
   const [editModal, setEditModal] = useState(false);

   useEffect(() => {
      getCategories()
   }, [getCategories])


   let deleteCategoryClick = (category_id, name) => {
      if (window.confirm(`Do you want to remove ${name} from category?`)) {
         deleteCategory(category_id)
      }
   }

   let toggle = () => {
      setEditModal(!editModal)
   }

   let editCategoryClick = (category_id, name) => {
      setCategories(name)
      setCategoryID(category_id)
      toggle()
   }

   let handleSubmit = e => {
      e.preventDefault()
      editCategory({ category_id: categoryID, name: categories })
   }

   if (isValid) {
      if (editModal) {
         toggle()
      }
   }

   isLoading && <Loader4 />

   return (
      <div>
         <Card className="shadow">
            <CardHeader className="bg-primary text-white text-capitalize">
               <h3>categories:</h3>
            </CardHeader>
            <CardBody>
               <ListGroup>
                  {
                     category.map((item) => (
                        <ListGroupItem className=" text-capitalize" key={item._id}>
                           <div className="d-flex justify-content-between align-items-center">
                              <h4><span className="title-color mr-3"><BiMinusCircle /></span>{item.name}</h4>
                              <div className="d-flex align-items-center">
                                 <BiEditAlt className="text-info mr-3" onClick={() => editCategoryClick(item.category_id, item.name)} />
                                 <BiTrashAlt
                                    className="text-danger mr-3"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => deleteCategoryClick(item.category_id, item.name)}
                                 />
                              </div>
                           </div>
                        </ListGroupItem>
                     ))
                  }
               </ListGroup>
            </CardBody>
         </Card>
         <Modal isOpen={editModal}>
            <ModalHeader className="text-capitalize" toggle={toggle}>category name</ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="category"
                        placeholder="name@example.com"
                        value={categories}
                        onChange={e => setCategories(e.target.value)}
                     />
                     <label htmlFor="category">Category:</label>
                  </div>
                  {
                     isLoading &&
                     <div className="my-5">
                        <MoonLoader size={32} color='#0d6efd' />
                     </div>
                  }
                  {
                     !isLoading &&
                     <button
                        type="submit"
                        className="btn btn-secondary my-3 px-4 text-capitalize"
                     >Update Category</button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}

const mapStateToProps = state => ({
   isLoading: state.category.isLoading,
   isValid: state.category.isValid,
   category: state.category.category,
})

export default connect(mapStateToProps, { deleteCategory, getCategories, editCategory })(CategoryList)
