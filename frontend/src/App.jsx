import { LogAndRegProvider } from "./context/logAndRegContext.jsx";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";

import DashboardLayout from "./layout/DashboardLayout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import DashboardHome from "./pages/Dashboard.jsx";
import PositionList from "./pages/PositionList.jsx";
import PositionDetails from "./pages/PositionDetails.jsx";
import PositionEdit from "./pages/PositionEdit.jsx";
import Application from "./pages/Application.jsx";
import ApplicationList from "./pages/ApplicationList.jsx";
import CVList from "./pages/CVList.jsx";
import CVEdit from "./pages/CVEdit.jsx";
import MyCV from "./pages/MyCV.jsx";
import Profile from "./pages/Profile.jsx";

import ProtectedRoute from "./hooks/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <LogAndRegProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />

            {/* Position Routes */}
            <Route path="positions/list" element={<PositionList />} />
            <Route path="positions/:id" element={<PositionDetails />} />
            <Route
              path="positions/edit/:id"
              element={
                <RoleRoute allowedRoles={["admin", "recruiter", "leader"]}>
                  <PositionEdit />
                </RoleRoute>
              }
            />

            {/* Application Routes */}
            <Route
              path="applications/apply/:positionId"
              element={<Application />}
            />
            <Route
              path="applications/list"
              element={
                <RoleRoute allowedRoles={["admin", "recruiter", "leader"]}>
                  <ApplicationList />
                </RoleRoute>
              }
            />

            {/* CV Routes */}
            <Route
              path="my-cv"
              element={
                <RoleRoute allowedRoles={["candidate", "admin"]}>
                  <MyCV />
                </RoleRoute>
              }
            />

            <Route path="profile/me" element={<Profile />} />

            <Route
              path="cvs"
              element={
                <RoleRoute allowedRoles={["admin", "recruiter"]}>
                  <CVList />
                </RoleRoute>
              }
            />

            <Route
              path="cvs/edit/:candidateId"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <CVEdit />
                </RoleRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LogAndRegProvider>
    </BrowserRouter>
  );
}
