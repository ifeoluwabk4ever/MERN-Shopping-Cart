import axios from 'axios'
import { toast } from 'react-toastify'
import { GET_ITEMS, DELETE_ITEMS, ITEMS_LOADING, GET_FAIL, DELETE_FAIL, UPDATE_FAIL, UPDATE_ITEM } from './ActionTypes'



export let getCategories = () => async dispatch => {
   try {
      dispatch(setItemLoading())

      let res = await axios.get(`/api/category`)
      dispatch({
         type: GET_ITEMS,
         payload: res.data.msg
      })
   } catch (error) {
      dispatch({ type: GET_FAIL })
   }
}


export let editCategory = ({ category_id, name }) => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.put(`/api/category/${category_id}`, { name })
      dispatch({
         type: UPDATE_ITEM,
         payload: res.data
      })
      console.log(res.data);
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: UPDATE_FAIL })
   }
}

export let deleteCategory = category_id => async dispatch => {
   try {
      dispatch(setItemLoading())
      let res = await axios.delete(`/api/category/${category_id}`)
      dispatch({
         type: DELETE_ITEMS,
         payload: category_id
      })
      toast.success(res.data.msg)
   } catch (error) {
      let errors = error.response.data.msg
      if (errors) toast.error(errors)

      dispatch({ type: DELETE_FAIL })
   }
}

export let setItemLoading = () => {
   return {
      type: ITEMS_LOADING
   }
}