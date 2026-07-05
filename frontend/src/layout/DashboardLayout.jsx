import { useState, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { LogAndRegContext } from "../hooks/logAndRegContextValue";
import { fetchApi } from "../api/fetch";
import LoadingSpinner from "../components/LoadingSpinner";
import AddPositionModal from "../components/AddPosition";

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, token, logOut } = useContext(LogAndRegContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalPositions: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchApi("/dashboard/stats");
        setStats(result.stats);
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <LoadingSpinner />;

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
            {token && user ? `Welcome, ${user?.fastName}` : "Welcome"}
          </h2>
          <button
            onClick={() => {
              logOut();
              navigate("/login");
            }}
            className="bg-red-500 hover:cursor-pointer select-none text-white px-4 py-2 rounded"
          >
            {token ? null : "Login"}
          </button>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
              <h1 className="text-2xl font-bold text-slate-800">
                Dashboard Overview
              </h1>
              {user?.role === "Admin" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-slate-900 text-white px-4 py-2 hover:cursor-pointer select-none rounded-lg hover:bg-slate-700 transition"
                >
                  + Add Position
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-blue-500">
                <p className="text-slate-500 font-medium">
                  Total Open Positions
                </p>
                <h3 className="text-4xl font-bold mt-2 text-slate-800">
                  {stats.totalPositions}
                </h3>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-emerald-500">
                <p className="text-slate-500 font-medium">
                  Total Registered Users
                </p>
                <h3 className="text-4xl font-bold mt-2 text-slate-800">
                  {stats.totalUsers}
                </h3>
              </div>
            </div>

            {stats.totalPositions === 0 && (
              <div className="bg-white p-12 text-center rounded-xl shadow-sm border border-dashed border-slate-300">
                <p className="text-slate-500 text-lg">No records.</p>
              </div>
            )}
          </div>
          <Outlet />
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
