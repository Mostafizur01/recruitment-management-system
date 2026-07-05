import { LogAndRegProvider } from "./context/logAndRegContext.jsx";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import DashboardLayout from "./pages/DashboardLayout.jsx";
import AddPositionModal from "./components/AddPosition.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <LogAndRegProvider>
        <Routes>
          <Route path="/" element={<DashboardLayout />} />
          <Route path="/addposition" element={<AddPositionModal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </LogAndRegProvider>
    </BrowserRouter>
  );
}
