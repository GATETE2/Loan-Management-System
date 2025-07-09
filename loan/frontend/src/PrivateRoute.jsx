import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, role, allowedRoles = [] }) {
  if (!role) return <Navigate to="/login" />;
  if (allowedRoles.length && !allowedRoles.includes(role)) return <Navigate to="/dashboard" />;
  return children;
}

export default PrivateRoute;