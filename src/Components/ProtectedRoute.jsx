import { useUser } from "@clerk/react";
import React, { Children } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) return null;
  return isSignedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
