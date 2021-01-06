import React from 'react'
import { NavLink } from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'


import { logout } from '../../Data/Actions/AuthAction'

const Logout = ({ logout }) => {
   let history = useHistory()
   let btnClick = () => {
      logout()
      history.push("/")
   }
   return (
      <>
         <NavLink onClick={btnClick} href='#'>Logout</NavLink>
      </>
   )
}

Logout.propTypes = {
   logout: PropTypes.func.isRequired
}

export default connect(null, { logout })(Logout)