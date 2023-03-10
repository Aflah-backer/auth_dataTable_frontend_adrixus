import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function LoggedIn() {
    const user = useSelector((state) => state.auth.user)
  return  user? <Outlet/> : <Navigate to='/signin'/>
}

export default LoggedIn