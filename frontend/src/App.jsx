import { LogAndRegProvider } from "./context/logAndRegContext.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import AddPositionModal from "./components/AddPosition.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PositionEdit from "./pages/PositionEdit.jsx";
import PositionList from "./pages/PositionList.jsx";
import DashboardHome from "./pages/Dashobard.jsx";
import PositionDetails from "./pages/PositionDetails.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <LogAndRegProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} /> 
            <Route path="addposition" element={<AddPositionModal />} />
            <Route path="positions/list" element={<PositionList />} />
            <Route path="positions/:id" element={<PositionDetails />} />
            <Route path="positions/edit/:id" element={<PositionEdit />} />
          </Route>
        </Routes>
      </LogAndRegProvider>
    </BrowserRouter>
  );
}