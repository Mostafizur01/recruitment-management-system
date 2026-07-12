import { useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { LogAndRegContext } from "../hooks/logAndRegContextValue";
import AddPositionModal from "../components/AddPosition";
import Sidebar from "../components/Sidebar.jsx";

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, token, logOut } = useContext(LogAndRegContext);
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
          <h2 className="text-lg font-semibold">
            {token && user ? `Welcome, ${user.firstName || "User"}` : "Welcome"}
          </h2>
          <button
            onClick={() => {
              logOut();
              navigate("/login");
            }}
            className="bg-red-500 text-white px-4 py-2 hover:cursor-pointer rounded select-none"
          >
            {token ? "Logout" : "Login"}
          </button>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8">
          <Outlet context={{ setIsModalOpen, user }} />
        </main>
      </div>

      <AddPositionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={() => window.location.reload()}
      />
    </div>
  );
}
