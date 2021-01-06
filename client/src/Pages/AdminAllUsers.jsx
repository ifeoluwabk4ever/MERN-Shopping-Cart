import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Container } from 'reactstrap'


import { loadAllUsers } from '../Data/Actions/AuthAction'
import Loading from '../Utils/Loading'
import { dateFormat } from './UserInfo'
import { URLDevelopment } from '../Helpers/Url'


export let getAge = myAge => {
   let val1 = new Date(myAge).getTime()
   let val2 = Date.now()
   let val3 = new Date(val2 - val1)
   return Math.abs(val3.getUTCFullYear() - 1970)
}



const AdminAllUsers = ({ isLoading, allUsers, loadAllUsers }) => {


   isLoading && <Loading />

   useEffect(() => {
      loadAllUsers()
   }, [loadAllUsers])

   allUsers.length === 0 && <h1 className="text-center text-muted text-capitalize">No users yet</h1>


   return (
      <Container className="my-5">
         <h1 className="text-center title-color text-uppercase">CarePoint users</h1>
         <Card className="shadow my-3">
            <CardHeader className="bg-primary text-white text-capitalize">
               <h3>Admins:</h3>
            </CardHeader>
            <CardBody className="product-name">
               {
                  allUsers.map(users => (
                     users.role === 1 &&
                     <div className="border mb-3 p-3 shadow" key={users._id}>
                        <div className="d-flex">
                           <img src={`${URLDevelopment}/Images/Uploads/${users.avatar}`} alt={users.name} className="user-avatar2 mb-3 mx-auto" />
                        </div>
                        <p className="text-muted"><strong className="title-color mr-2">ID:</strong>{users._id}</p>
                        <p className="text-muted"><strong className="title-color mr-2 text-capitalize">Name:</strong>{users.name}</p>
                        <p className="text-muted"><strong className="title-color mr-2">Email:</strong>{users.email}</p>
                        <p className="text-muted"><strong className="title-color mr-2">Phone Number:</strong> {users.telephone}</p>
                        <p className="text-muted"><strong className="title-color mr-2">Age:</strong> {getAge(users.dob)} year old</p>
                        <p className="text-muted"><strong className="title-color mr-2">Date Registered:</strong> {dateFormat(users.createdAt)}</p>
                        <button className="btn btn-outline-info">Info</button>
                     </div>
                  ))
               }
            </CardBody>
         </Card>
         <Card className="shadow my-3">
            <CardHeader className="bg-primary text-white text-capitalize">
               <h3>Users:</h3>
            </CardHeader>
            <CardBody className="product-name">
               {
                  allUsers.map(users => (
                     users.role === 0 &&
                     <div className="border mb-3 p-3 shadow" key={users._id}>
                        <div className="d-flex">
                           <img src={`${URLDevelopment}/Images/Uploads/${users.avatar}`} alt={users.name} className="user-avatar2 mb-3 mx-auto" />
                        </div>
                        <p className="text-muted"><strong className="title-color mr-2">ID:</strong>{users._id}</p>
                        <p className="text-muted"><strong className="title-color mr-2 text-capitalize">Name:</strong>{users.name}</p>
                        <p className="text-muted"><strong className="title-color mr-2">Email:</strong>{users.email}</p>
                        <p className="text-muted"><strong className="title-color mr-2">Phone Number:</strong> {users.telephone}</p>
                        <p className="text-muted"><strong className="title-color mr-2">Age:</strong> {getAge(users.dob)} year old</p>
                        <p className="text-muted"><strong className="title-color mr-2">Date Registered:</strong> {dateFormat(users.createdAt)}</p>
                        <button className="btn btn-outline-info">Info</button>
                     </div>
                  ))
               }
            </CardBody>
         </Card>
      </Container>
   )
}



const mapStateToProps = state => ({
   isLoading: state.auth.isLoading,
   allUsers: state.auth.allUsers
})

export default connect(mapStateToProps, { loadAllUsers })(AdminAllUsers)
