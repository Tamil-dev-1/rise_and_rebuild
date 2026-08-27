import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }) => {

  const token = sessionStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/register" replace />;
  }

  return children;
};

export default ProtectRoute;