import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, ALL_USERS, ALL_USERS_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT, SET_LOADING } from '../Actions/ActionTypes'

// Initial State
const initialState = {
   token: localStorage.getItem('token'),
   isAuthenticated: null,
   isLoading: true,
   user: null,
   allUsers: [],
   cart: []
}

// Reducers
export default (state = initialState, action) => {
   let { type, payload, isAdmin, avatar, cart } = action
   switch (type) {
      case ALL_USERS:
         return {
            ...state,
            isAuthenticated: true,
            allUsers: payload,
            isLoading: false,
         }
      case USER_LOADED:
         return {
            ...state,
            user: payload,
            isAuthenticated: true,
            isLoading: false,
            isAdmin,
            avatar,
            cart
         }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
         // Set token in local Storage
         localStorage.setItem('token', payload.token)
         return {
            ...state,
            ...payload,
            isAuthenticated: true,
            isLoading: false
         }
      case SET_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case REGISTER_FAIL:
      case LOGIN_FAIL:
      case AUTH_ERROR:
      case ALL_USERS_FAIL:
      case LOGOUT:
         // Remove token in local Storage
         localStorage.removeItem('token')
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            isLoading: false
         }
      default: return state
   }
}