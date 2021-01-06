import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'



import HomePage from './Pages/HomePage'
import Header from './Components/Header'
import Footer from './Components/Footer'
import FooterTop from './Components/FooterTop'
import HeadersContact from './Components/HeadersContact'
import ErrorPage from './Utils/ErrorPage'
import AboutPage from './Pages/AboutPage'
import ContactPage from './Pages/ContactPage'
import SingleProductPage from './Components/Product/SingleProductPage'
import ProductPage from './Pages/ProductPage'
import UserInfo from './Pages/UserInfo'
import Category from './Components/Category/Category'
import AddProduct from './Components/Product/AddProduct'
import AdminAllUsers from './Pages/AdminAllUsers'
import CartPage from './Pages/CartPage'
import UsersFeedback from './Components/ContactDetails/UsersFeedback'
import EditProduct from './Components/Product/EditProduct'



const Routes = ({ isAuth, isAdmin }) => {
   return (
      <Router>
         <HeadersContact />
         <hr className="d-none d-lg-block" />
         <Header />
         <ToastContainer />
         <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/about-us" component={!isAdmin ? AboutPage : ErrorPage} />
            <Route exact path="/contact-us" component={!isAdmin ? ContactPage : ErrorPage} />
            <Route exact path="/products/:slug" component={SingleProductPage} />
            <Route exact path="/products" component={ProductPage} />
            <Route exact path="/dashboard/user" component={isAuth ? UserInfo : ErrorPage} />
            <Route exact path="/cart" component={isAuth && !isAdmin ? CartPage : ErrorPage} />
            <Route exact path="/all-users" component={isAuth && isAdmin ? AdminAllUsers : ErrorPage} />
            <Route exact path="/add-product" component={isAuth && isAdmin ? AddProduct : ErrorPage} />
            <Route exact path="/edit-product/:slug" component={isAuth && isAdmin ? EditProduct : ErrorPage} />
            <Route exact path="/category" component={isAuth && isAdmin ? Category : ErrorPage} />
            <Route exact path="/users-feedbacks" component={isAuth && isAdmin ? UsersFeedback : ErrorPage} />
            <Route component={ErrorPage} />
         </Switch>
         <FooterTop />
         <Footer />
      </Router>
   )
}

const mapStateToProps = state => ({
   isAuth: state.auth.isAuthenticated,
   isAdmin: state.auth.isAdmin,
   user: state.auth.user
})

export default connect(mapStateToProps, null)(Routes)
