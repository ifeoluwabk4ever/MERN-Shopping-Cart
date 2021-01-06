import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { connect, useDispatch } from 'react-redux'
import { MoonLoader } from 'react-spinners'
import axios from 'axios'
import { toast } from 'react-toastify'

import { ADD_ITEMS, ADD_FAIL } from '../../Data/Actions/ActionTypes'
import { setItemLoading } from '../../Data/Actions/CategoryAction'
import { getCategories } from '../../Data/Actions/CategoryAction'

const CategoryModal = ({ isLoading, getCategories, isValid }) => {

   let [category, setCategory] = useState('')
   let [modal, setModal] = useState(false)
   let dispatch = useDispatch()



   let handleSubmit = async e => {
      e.preventDefault()

      try {
         dispatch(setItemLoading())
         let res = await axios.post(`/api/category`, { category })
         dispatch({
            type: ADD_ITEMS,
            payload: res.data
         })
         toast.success(res.data.msg)
         setCategory('')
         getCategories()
      } catch (error) {
         let errors = error.response.data.msg
         if (errors) toast.error(errors)

         dispatch({ type: ADD_FAIL })
      }

   }
   let toggle = () => {
      setModal(!modal)
   }

   if (isValid) {
      if (modal) {
         toggle()
      }
   }

   return (
      <div>
         <button onClick={toggle} className="btn btn-secondary mb-5">Add Category</button>
         <Modal isOpen={modal}>
            <ModalHeader className="text-capitalize" toggle={toggle}>category name</ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="category"
                        placeholder="name@example.com"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
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
                     >Add Category</button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}



const mapStateToProps = state => ({
   isLoading: state.category.isLoading,
   isValid: state.category.isValid
})

export default connect(mapStateToProps, { getCategories })(CategoryModal)
