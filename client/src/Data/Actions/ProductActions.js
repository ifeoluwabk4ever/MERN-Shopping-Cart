import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_PRODUCTS, DELETE_PRODUCTS, PRODUCTS_LOADING, PRODUCT_GET_FAIL, PRODUCT_DELETE_FAIL } from './ActionTypes'


export let getProducts = () => async dispatch => {
   try {
      dispatch(setItemLoading())

      let res = await axios.get(`/api/products`)
      dispatch({
         type: GET_PRODUCTS,
         payload: res.data.msg
      })
   } catch (error) {
      dispatch({ type: PRODUCT_GET_FAIL })
   }
}

export let deleteProduct = product_slug => async dispatch => {
   try {
      dispatch(setItemLoading())
      await axios.delete(`/api/products/${product_slug}`)
      dispatch({
         type: DELETE_PRODUCTS,
         payload: product_slug
      })
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: PRODUCT_DELETE_FAIL })
   }
}

export let setItemLoading = () => {
   return {
      type: PRODUCTS_LOADING
   }
}

