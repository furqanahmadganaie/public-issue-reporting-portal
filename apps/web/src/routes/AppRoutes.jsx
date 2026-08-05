import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import VerifyPhone from "../pages/auth/VerifyPhone";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Dashboard from "../pages/citizen/Dashboard";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />}
      />

      {/* Authentication */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-phone" element={<VerifyPhone />}
      />
      <Route path="/forgot-password" element={<ForgotPassword />}
      />
      <Route path="/reset-password" element={<ResetPassword />}
      />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}
      />

      {/* 404 */}

      <Route path="*" element={<h1>404 Page Not Found</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;