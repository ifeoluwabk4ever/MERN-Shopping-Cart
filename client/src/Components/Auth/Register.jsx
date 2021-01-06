import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Modal, ModalHeader, ModalBody, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { MoonLoader, DotLoader } from 'react-spinners'
import { FaTimes } from 'react-icons/all'
import axios from 'axios'


import { register } from '../../Data/Actions/AuthAction'


const RegisterModal = ({ register, isAuth, isLoading, user }) => {

   let [data, setData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      telephone: '',
      dob: ''
   })
   const [images, setImages] = useState(false)
   let [modal, setModal] = useState(false)
   let [loading, setLoading] = useState(false)
   let [avatar, setAvatar] = useState('avatar3.png')

   let { name, email, password, confirmPassword, telephone, dob } = data

   let textChange = name => e => {
      setData({ ...data, [name]: e.target.value })
   }

   let toggle = () => {
      setModal(!modal)
   }

   let styleUpload = {
      display: images ? "block" : "none"
   }

   let handleProfileUpload = async e => {
      e.preventDefault()

      try {
         let file = e.target.files[0]
         if (!file) return toast.error("No Image file included...")
         if (file.size > 1024 * 1024 * 2) return toast.error("File size too large, ~= 2mb...")
         if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') return toast.error("File format unaccepted...")

         avatar = new FormData()
         avatar.append('avatar', file)

         setLoading(true)
         const res = await axios.post(`/api/upload/profile-picture`, avatar, {
            headers: {
               'content-type': 'multipart/form-data'
            }
         })
         setLoading(false)
         setImages(res.data.msg);
         setAvatar(res.data.msg.avatar)
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleProfileDestroy = async () => {
      try {

         setLoading(true)
         let res = await axios.post(`/api/destroy/profile-picture`, { avatar_path: `./Public/Images/Uploads/${avatar}` })

         setLoading(false)
         setImages(false)
         toast.warning(res.data.msg)
         setAvatar('avatar3.jpg')
      } catch (error) {
         toast.error(error.response.data.msg)
      }
   }

   let handleSubmit = async e => {
      e.preventDefault()
      register({ name, email, password, telephone, dob, avatar })
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
         <NavLink onClick={toggle} href='#'>Register</NavLink>
         <Modal
            isOpen={modal}
         >
            <ModalHeader toggle={toggle}> Register Form </ModalHeader>
            <ModalBody>
               <div>
                  <div className="upload upload2 col-4 mx-auto position-relative p-2">
                     <input
                        className="upload-file upload-file2"
                        type="file"
                        id="file_up"
                        name="file"
                        onChange={handleProfileUpload}
                     />
                     {
                        loading ?
                           <div className="file_img file_img2 d-flex align-items-center justify-content-center">
                              <DotLoader color="#0d6efd" size={24} />
                           </div>
                           : <div className="file_img file_img2" style={styleUpload}>
                              <img src={images ? `/Images/Uploads/${images.avatar}` : ''} alt="profile_picture" />
                              <div className="faTimes" onClick={handleProfileDestroy}>
                                 <FaTimes color="red" size={20} />
                              </div>
                           </div>
                     }
                  </div>
               </div>
               <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                     <input
                        type="text"
                        className="form-control text-black"
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={textChange('name')}
                     />
                     <label htmlFor="name">Name:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="email"
                        className="form-control text-black"
                        id="email1"
                        placeholder="name@example.com"
                        value={email}
                        onChange={textChange('email')}
                     />
                     <label htmlFor="email1">Email address:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="tel"
                        className="form-control text-black"
                        id="telephone"
                        placeholder="2348198765432"
                        value={telephone}
                        onChange={textChange('telephone')}
                     />
                     <label htmlFor="telephone">Phone Number:</label>
                  </div>
                  <div className="form-floating mb-3">
                     <input
                        type="date"
                        className="form-control text-black"
                        id="dob"
                        placeholder="1998-07-27"
                        value={dob}
                        onChange={textChange('dob')}
                     />
                     <label htmlFor="dob">Phone Number:</label>
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
                  <div className="form-floating mb-3">
                     <input
                        type="password"
                        className="form-control text-black"
                        id="confirmPassword"
                        placeholder="******"
                        value={confirmPassword}
                        onChange={textChange('confirmPassword')}
                     />
                     <label htmlFor="confirmPassword">Confirm Password:</label>
                  </div>
                  {
                     isLoading &&
                     <div className="my-5 ml-5">
                        <MoonLoader size={32} color='#0d6efd' />
                     </div>
                  }
                  {
                     !isLoading &&
                     <button
                        type="submit"
                        className="btn btn-primary my-3 px-4 text-capitalize"
                     >Register</button>
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

export default connect(mapStateToProps, { register })(RegisterModal)
