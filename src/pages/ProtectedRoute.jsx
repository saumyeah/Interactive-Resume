import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/" replace />; // redirect to login if not logged in
  }

  return children; // allow access if logged in
}
