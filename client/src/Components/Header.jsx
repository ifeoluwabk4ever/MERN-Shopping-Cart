import React, { Fragment, useState, useContext } from 'react'
import { Collapse, Container, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import { FaShoppingBasket } from 'react-icons/all'


import RegisterModal from './Auth/Register'
import LoginModal from './Auth/Login'
import Logout from './Auth/Logout'
import logo from '../Images/carepoint.png'
import { ProductContext } from './Product/ProductContext'
import { numberWithCommas } from '../Utils/Format'




const Header = ({ isAuth, user, isAdmin, avatar }) => {
   const context = useContext(ProductContext)
   let { cartTotal } = context
   const [isOpen, setIsOpen] = useState(false)


   const toggle = () => {
      setIsOpen(!isOpen)
   }

   const navLinks = (
      !isAdmin ?
         <NavLink href="/cart" className="cart animate2">
            <div className="d-flex nav-container">
               <FaShoppingBasket size={30} />
               <div className='amount-container'>
                  <p className='total-amount'>{numberWithCommas(cartTotal)}</p>
               </div>
            </div>
         </NavLink> :
         <h3 className="text-dark-50 animate2">Admin</h3>

   )

   const userImg = (
      isAuth && <NavLink href="/dashboard/user" className="ml-2 animate2">
         <img src={`/Images/Uploads/${avatar}`} alt="User" className="user-avatar" />
      </NavLink>
   )

   const guestLinks = (
      <Fragment>
         <NavItem className='text-dark-50 text-capitalize animate2 navList'>
            <RegisterModal />
         </NavItem>
         <NavItem className='text-dark-50 text-capitalize animate2 navList'>
            <LoginModal />
         </NavItem>
      </Fragment>
   )

   const mainLinks = (
      <Fragment>
         <NavItem className="text-dark-50 text-capitalize animate2 navList">
            <NavLink href="/">Home</NavLink>
         </NavItem>
         <NavItem className="text-dark-50 text-capitalize animate2 navList">
            <NavLink href="/about-us">about us</NavLink>
         </NavItem>
         <NavItem className="text-dark-50 text-capitalize animate2 navList">
            <NavLink href="/products">Products</NavLink>
         </NavItem>
         <NavItem className="text-dark-50 text-capitalize animate2 navList">
            <NavLink href="/history">History</NavLink>
         </NavItem>
         <NavItem className="text-dark-50 text-capitalize animate2 navList">
            <NavLink href="/contact-us">contact us</NavLink>
         </NavItem>
      </Fragment>
   )
   const adminLinks = (
      <Fragment>
         <NavItem className="text-dark-50 text-capitalize animate2 navList">
            <NavLink href="/">Home</NavLink>
         </NavItem>
         <NavItem className="text-dark-50 text-capitalize animate2 navList">
            <NavLink href="/category">category</NavLink>
         </NavItem>
         <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
               Products
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
               <NavItem className="text-dark-50 text-capitalize animate2 navList dropdown-item">
                  <NavLink href="/products">all Products</NavLink>
               </NavItem>
               <NavItem className="text-dark-50 text-capitalize animate2 navList dropdown-item">
                  <NavLink href="/add-product">add product</NavLink>
               </NavItem>
            </ul>
         </div>
         <div className="dropdown">
            <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
               Others
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
               <NavItem className="text-dark-50 text-capitalize animate2 navList dropdown-item">
                  <NavLink href="/all-users">Users</NavLink>
               </NavItem>
               <NavItem className="text-dark-50 text-capitalize animate2 navList dropdown-item">
                  <NavLink href="/users-feedbacks">Feedbacks</NavLink>
               </NavItem>
               <NavItem className="text-dark-50 text-capitalize animate2 navList dropdown-item">
                  <NavLink href="/users-history">History</NavLink>
               </NavItem>
            </ul>
         </div>
      </Fragment>
   )

   const authLinks = (
      <Fragment>
         <NavItem className="text-dark-50 animate2 navList">
            <Logout />
         </NavItem>
      </Fragment>
   )


   return (
      <Navbar expand="lg" light color="light" sticky="top" className="shadow">
         <Container>
            <NavbarToggler onClick={toggle} />
            <div className="d-flex align-items-center">
               <NavbarBrand href="/" className="navList animate2">
                  <img src={logo} alt="carepoint" className="main-logo" />
               </NavbarBrand>
               <NavbarBrand href="/" className="navList animate2 text-uppercase d-lg-block d-none">CarePoint</NavbarBrand>
            </div>
            {
               isAuth && <div className="ml-lg-2 d-lg-none d-inline-flex align-items-center featured-btn">
                  {navLinks} {userImg}
               </div>
            }
            <Collapse isOpen={isOpen} navbar>
               <Nav className="ml-auto d-flex align-items-center" navbar>
                  {
                     isAuth && isAdmin ? adminLinks : mainLinks
                  }
                  {
                     !isAuth ? guestLinks : authLinks
                  }
               </Nav>
            </Collapse>
            {
               isAuth && <div className="ml-lg-2 d-lg-inline-flex align-items-center d-none">
                  {navLinks} {userImg}
               </div>
            }
         </Container>
      </Navbar>
   )
}

const mapStateToProps = state => ({
   isAuth: state.auth.isAuthenticated,
   isAdmin: state.auth.isAdmin,
   avatar: state.auth.avatar,
   user: state.auth.user
})

export default connect(mapStateToProps, null)(Header)
