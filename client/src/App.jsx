import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'
import $ from 'jquery'
import 'popper.js'
import 'react-toastify/dist/ReactToastify.css'


import './App.css';
import Routes from './Routes';
import store from './Data/Store'
import setAuthToken from './Helpers/SetAuthToken';
import { loadUser } from './Data/Actions/AuthAction'
import ProductProvider from './Components/Product/ProductContext'


if (localStorage.token) {
   setAuthToken(localStorage.token)
}


const App = () => {

   useEffect(() => {
      store.dispatch(loadUser())
   }, [])

   return (
      <Provider store={store}>
         <ProductProvider>
            <Routes />
         </ProductProvider>
      </Provider>
   );
}

export default App;
