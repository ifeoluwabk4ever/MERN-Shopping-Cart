// Root reducer to combine all reducers in the app

import { combineReducers } from 'redux'
import auth from './AuthReducer'
import product from './ProductReducer'
import category from './CategoryReducer'

export default combineReducers({
   auth,
   product,
   category
})