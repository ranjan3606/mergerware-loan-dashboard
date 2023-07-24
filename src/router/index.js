import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ allowedRoles, userRole, ...props }) => {
  if (!userRole || !allowedRoles.includes(userRole)) {
    // If the user's role is not allowed for this route, redirect to landing page or login page
    return <Navigate to="/" replace />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
