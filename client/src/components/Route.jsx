import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const obtenerRol = () => {
  const [userRole, setUserRole] = useState(sessionStorage.getItem('rol'));

  useEffect(() => {
    setUserRole(sessionStorage.getItem('rol'));
  }, []);
  
  return userRole
}


const PrivateRoutes = ({ children }) => {
  const userRole = obtenerRol()
  const isOwner = userRole === 'Owner';

  return isOwner ? <>{children}</> : <></>;
};

const PublicRoutes = ({ children }) => {
  const userRole = obtenerRol()
  console.log(userRole) 
  const isUser = userRole === 'User' || userRole === 'Owner';

  return isUser ? <>{children}</> : <Navigate to="/login" />;
};

export { PrivateRoutes, PublicRoutes };