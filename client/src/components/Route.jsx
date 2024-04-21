import React from 'react';
import { Navigate } from 'react-router-dom';



const userRole = sessionStorage.getItem('rol');

const PrivateRoutes = ({ children }) => {
  const isOwner = userRole === 'Owner';

  return isOwner ? <>{children}</> : '';
};

const PublicRoutes = ({ children }) => {
    const isUser = userRole === 'User' || userRole === 'Owner';

    return isUser ? <>{children}</> : <Navigate to="/login" />;
};

export { PrivateRoutes, PublicRoutes };