import { LogAndRegProvider } from "./context/logAndRegContext.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";

// Components
import DashboardLayout from "./layout/DashboardLayout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

// Pages
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
import Unauthorized from "./pages/Unauthorized.jsx";

// Auth Components
import ProtectedRoute from "./hooks/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <LogAndRegProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardHome />} />

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

            <Route path="my-cv" element={<MyCV />} />
            <Route path="profile/me" element={<Profile />} />
            <Route
              path="cvs"
              element={
                <RoleRoute allowedRoles={["admin", "recruiter"]}>
                  <CVList />
                </RoleRoute>
              }
            />
            <Route path="cvs/edit/:candidateId" element={<CVEdit />} />
          </Route>
        </Routes>
      </LogAndRegProvider>
    </BrowserRouter>
  );
}
