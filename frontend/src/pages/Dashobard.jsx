import { useState, useEffect } from "react";
import { fetchApi } from "../api/fetch";
import LoadingSpinner from "../components/LoadingSpinner";

export default function DashboardHome({ setIsModalOpen, user }) {
  const [stats, setStats] = useState({ totalPositions: 0, totalUsers: 0 });
  const [loading, setLoading] = useState(true);

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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
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
          <p className="text-slate-500 font-medium">Total Open Positions</p>
          <h3 className="text-4xl font-bold mt-2 text-slate-800">{stats.totalPositions}</h3>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border-l-4 border-emerald-500">
          <p className="text-slate-500 font-medium">Total Registered Users</p>
          <h3 className="text-4xl font-bold mt-2 text-slate-800">{stats.totalUsers}</h3>
        </div>
      </div>
    </div>
  );
}