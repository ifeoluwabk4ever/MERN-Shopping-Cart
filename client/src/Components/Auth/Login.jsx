import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader } from 'react-spinners'


import { login } from '../../Data/Actions/AuthAction'

const LoginModal = ({ login, isAuth, isLoading, user }) => {

   let [data, setData] = useState({
      email: '',
      password: ''
   })
   let [modal, setModal] = useState(false)

   let { email, password } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   let handleSubmit = async e => {
      e.preventDefault()

      login({ email, password })
   }

   let toggle = () => {
      setModal(!modal)
   }

   if (isAuth && user) {
      let { name } = user.user
      toast.success(`Welcome ${name}`)

      if (modal) {
         toggle()
      }
   }

   return (
      <div>
         <NavLink onClick={toggle} href='#'>Login</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> Login Form </ModalHeader>
            <ModalBody>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="email"
                        className="form-control text-black"
                        id="email1"
                        placeholder="name@example.com"
                        value={email}
                        onChange={textChange("email")}
                     />
                     <label htmlFor="email1">Email address:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="password"
                        className="form-control text-black"
                        id="password"
                        placeholder="******"
                        value={password}
                        onChange={textChange('password')}
                     />
                     <label htmlFor="password">Password:</label>
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
                        className="btn btn-primary my-3 px-4 text-capitalize"
                     >Login</button>
                  }
               </form>
            </ModalBody>
         </Modal>
      </div>
   )
}



const mapStateToProps = state => ({
   isAuth: state.auth.isAuthenticated,
   isLoading: state.auth.isLoading,
   user: state.auth.user
})

export default connect(mapStateToProps, { login })(LoginModal)
