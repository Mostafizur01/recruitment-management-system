import { LogAndRegProvider } from "./context/logAndRegContext.jsx";
import { Route, Routes, BrowserRouter, } from "react-router-dom";

// Components
import DashboardLayout from "./layout/DashboardLayout.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

// Pages
import DashboardHome from "./pages/Dashboard.jsx";
import AddPositionModal from "./components/AddPosition.jsx";
import PositionList from "./pages/PositionList.jsx";
import PositionDetails from "./pages/PositionDetails.jsx";
import PositionEdit from "./pages/PositionEdit.jsx";
import Application from "./pages/Application.jsx";
import ApplicationList from "./pages/ApplicationList.jsx";
import CVList from "./pages/CVList.jsx";
import CVEdit from "./pages/CVEdit.jsx";
import MyCV from "./pages/MyCV.jsx";

// Auth Components
import PrivateRoute from "./components/PrivateRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <LogAndRegProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }>
            <Route index element={<DashboardHome />} />
            
            <Route path="addposition" element={
              <RoleRoute allowedRoles={['admin', 'leader']}>
                <AddPositionModal />
              </RoleRoute>
            } />
            <Route path="positions/list" element={<PositionList />} />
            <Route path="positions/:id" element={<PositionDetails />} />
            <Route path="positions/edit/:id" element={
              <RoleRoute allowedRoles={['admin', 'leader']}>
                <PositionEdit />
              </RoleRoute>
            } />
            
            <Route path="applications/" element={<Application />} />
            <Route path="applications/list" element={
              <RoleRoute allowedRoles={['admin', 'leader']}>
                <ApplicationList />
              </RoleRoute>
            } />
            
            <Route path="my-cv" element={<MyCV />} />
            
            <Route path="cvs" element={
              <RoleRoute allowedRoles={['admin', 'leader']}>
                <CVList />
              </RoleRoute>
            } />
            <Route path="cvs/edit/:candidateId" element={
              <RoleRoute allowedRoles={['admin', 'leader']}>
                <CVEdit />
              </RoleRoute>
            } />
          </Route>
        </Routes>
      </LogAndRegProvider>
    </BrowserRouter>
  );
}