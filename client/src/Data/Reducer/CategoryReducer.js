import { GET_ITEMS, ADD_ITEMS, DELETE_ITEMS, ITEMS_LOADING, GET_FAIL, ADD_FAIL, DELETE_FAIL, UPDATE_FAIL, UPDATE_ITEM } from '../Actions/ActionTypes'


// Initial State
let initialState = {
   category: [],
   isLoading: false,
   isValid: null
}

export default (state = initialState, action) => {
   let { payload, type } = action
   switch (type) {
      case GET_ITEMS:
         return {
            ...state,
            category: payload,
            isLoading: false
         }
      case DELETE_ITEMS:
         return {
            ...state,
            category: state.category.filter(item => item.category_id !== payload),
            isLoading: false
         }
      case ADD_ITEMS:
         return {
            ...state,
            category: [payload, ...state.category],
            isLoading: false,
            isValid: true
         }
      case UPDATE_ITEM:
         // let sortUpdate = state.category.filter(item => item.category_id !== payload.findCategory.category_id)
         return {
            ...state,
            category: [...state.category],
            isLoading: false,
            isValid: true
         }
      case ITEMS_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case ADD_FAIL:
      case DELETE_FAIL:
      case GET_FAIL:
      case UPDATE_FAIL:
         return {
            ...state,
            isLoading: false,
            isValid: false
         }
      default:
         return state
   }
}