import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../Helpers/SetAuthToken'
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, ALL_USERS, ALL_USERS_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, SET_LOADING } from './ActionTypes'



// LoadAll Users
export let loadAllUsers = () => async dispatch => {
   try {
      dispatch({
         type: SET_LOADING
      })

      let res = await axios.get(`/api/users/all-users`)
      dispatch({
         type: ALL_USERS,
         payload: res.data.msg
      })
   } catch (error) {
      dispatch({ type: ALL_USERS_FAIL })
   }
}

// LoadUser Action
export let loadUser = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token)
   }

   try {
      let res = await axios.get(`/api/users/info`)
      dispatch({
         type: USER_LOADED,
         payload: res.data,
         isAdmin: res.data.user.role === 1,
         avatar: res.data.user.avatar,
         cart: res.data.user.cart
      })
   } catch (error) {
      // console.log(error.response);
      dispatch({ type: AUTH_ERROR })

   }
}


// Register Action
export let register = ({ name, email, password, telephone, dob, avatar }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ name, email, password, telephone, dob, avatar })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/api/users/register`, body, config)
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
      })
      dispatch(loadUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: REGISTER_FAIL })
   }
}


// Login Action
export let login = ({ email, password }) => async dispatch => {
   // Config header for axios
   let config = {
      headers: {
         'Content-Type': 'application/json'
      }
   }

   // Set body
   let body = JSON.stringify({ email, password })

   dispatch({ type: SET_LOADING })
   try {
      // Response
      let res = await axios.post(`/api/users/login`, body, config)
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      })
      dispatch(loadUser())
      toast.success(res.data.msg)
   } catch (err) {
      let errors = err.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: LOGIN_FAIL })
   }
}


// Logout Action
export let logout = () => async dispatch => {
   dispatch({ type: LOGOUT })
   toast.success("Logout success")
}