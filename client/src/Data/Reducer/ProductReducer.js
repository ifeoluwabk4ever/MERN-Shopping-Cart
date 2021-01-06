import { GET_PRODUCTS, DELETE_PRODUCTS, PRODUCTS_LOADING, PRODUCT_GET_FAIL, PRODUCT_ADD_FAIL, PRODUCT_DELETE_FAIL, PRODUCT_UPDATE_FAIL } from '../Actions/ActionTypes'


// Initial State
let initialState = {
   products: [],
   isLoading: false
}

export default (state = initialState, action) => {
   let { payload, type } = action
   switch (type) {
      case GET_PRODUCTS:
         return {
            ...state,
            products: payload,
            isLoading: false
         }
      case DELETE_PRODUCTS:
         return {
            ...state,
            products: state.products.filter(item => item.product_slug !== payload),
            isLoading: false
         }
      case PRODUCTS_LOADING:
         return {
            ...state,
            isLoading: true
         }
      case PRODUCT_ADD_FAIL:
      case PRODUCT_DELETE_FAIL:
      case PRODUCT_GET_FAIL:
      case PRODUCT_UPDATE_FAIL:
         return {
            ...state,
            isLoading: false
         }
      default:
         return state
   }
}
