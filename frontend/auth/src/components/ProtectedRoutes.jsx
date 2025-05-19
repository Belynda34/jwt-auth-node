import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({role,allowedRoles,children}) => {
  
    if(!allowedRoles.includes(role)){
        return <Navigate to='/display'/>
    }
}

export default ProtectedRoutes