import React, { useState } from 'react'
import { toast } from 'react-toastify'

const ContactForm = () => {
   const [email, setEmail] = useState('')


   const handleSubmit = e => {
      e.preventDefault()

      toast.success(`Subscription successfully...`)
   }

   return (
      <>
         <h2 className="mb-5">Subscribe</h2>
         <p>Register here to subscribe to our newsletters...</p>
         <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
               <input
                  type="email"
                  className="form-control text-black"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com" />
               <label htmlFor="email" className="text-black-50">Email address</label>
            </div>
            <button
               type="submit"
               className="btn btn-primary text-capitalize"
            >
               subscribe
            </button>
         </form>
      </>
   )
}

export default ContactForm
