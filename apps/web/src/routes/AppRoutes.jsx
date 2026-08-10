import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

/* Authentication */
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import VerifyPhone from "../pages/auth/VerifyPhone";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

/* Citizen */
import Dashboard from "../pages/citizen/Dashboard";
import ReportIssue from "../pages/citizen/ReportIssue";
import IssueDetails from "../pages/citizen/IssueDetails";
import Profile from "../pages/citizen/Profile";
import MyIssues from "../pages/citizen/MyIssues";

/* Officer */
import OfficerDashboard from "../pages/officer/OfficerDashboard";
import PendingIssues from "../pages/officer/PendingIssues";
import AssignedIssues from "../pages/officer/AssignedIssues";
import InProgressIssues from "../pages/officer/InProgressIssues";
import ResolvedIssues from "../pages/officer/ResolvedIssues";
import OfficerIssueDetails from "../pages/officer/OfficerIssueDetails";
import OfficerTimeline from "../pages/officer/OfficerTimeline";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Redirect */}

      <Route
        path="/"
        element={
          <Navigate
            to="/login"
            replace
          />
        }
      />

      {/* Authentication */}

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/verify-phone"
        element={<VerifyPhone />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      {/* Citizen */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute
            allowedRoles={["Citizen"]}
          >
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/report-issue"
        element={
          <PrivateRoute
            allowedRoles={["Citizen"]}
          >
            <ReportIssue />
          </PrivateRoute>
        }
      />

      <Route
        path="/issues/:id"
        element={
          <PrivateRoute
            allowedRoles={["Citizen"]}
          >
            <IssueDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute
            allowedRoles={["Citizen"]}
          >
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/my-issues"
        element={
          <PrivateRoute
            allowedRoles={["Citizen"]}
          >
            <MyIssues />
          </PrivateRoute>
        }
      />

      {/* Officer */}

      <Route
        path="/officer/dashboard"
        element={
          <PrivateRoute
            allowedRoles={[
              "Municipal Officer",
            ]}
          >
            <OfficerDashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/officer/pending"
        element={
          <PrivateRoute
            allowedRoles={[
              "Municipal Officer",
            ]}
          >
            <PendingIssues />
          </PrivateRoute>
        }
      />

      <Route
        path="/officer/assigned"
        element={
          <PrivateRoute
            allowedRoles={[
              "Municipal Officer",
            ]}
          >
            <AssignedIssues />
          </PrivateRoute>
        }
      />

      <Route
        path="/officer/in-progress"
        element={
          <PrivateRoute
            allowedRoles={[
              "Municipal Officer",
            ]}
          >
            <InProgressIssues />
          </PrivateRoute>
        }
      />

      <Route
        path="/officer/resolved"
        element={
          <PrivateRoute
            allowedRoles={[
              "Municipal Officer",
            ]}
          >
            <ResolvedIssues />
          </PrivateRoute>
        }
      />

      <Route
        path="/officer/issues/:id"
        element={
          <PrivateRoute
            allowedRoles={[
              "Municipal Officer",
            ]}
          >
            <OfficerIssueDetails />
          </PrivateRoute>
        }
      />

      <Route
        path="/officer/issues/:id/timeline"
        element={
          <PrivateRoute
            allowedRoles={[
              "Municipal Officer",
            ]}
          >
            <OfficerTimeline />
          </PrivateRoute>
        }
      />

      {/* 404 */}

      <Route
        path="*"
        element={
          <h1 className="text-center mt-20 text-4xl font-bold">
            404 Page Not Found
          </h1>
        }
      />

    </Routes>
  );
};

export default AppRoutes;