import { useState, useEffect } from "react";
import { fetchApi } from "../api/fetch.js";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Briefcase, Users, UserPlus, Clock } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    openPositions: 0,
    totalApps: 0,
    newAppsToday: 0,
    active: 0,
    closed: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const data = await fetchApi("/dashboard");
      setStats(data?.stats || data);
    };
    loadStats();
  }, []);

  const pieData = [
    { name: "Active", value: stats.active },
    { name: "Closed", value: stats.closed },
  ];
  const COLORS = ["#1e293b", "#e2e8f0"];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold">Team Triquetra Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Open Positions",
            value: stats.openPositions,
            icon: <Briefcase />,
          },
          {
            title: "Total Applicants",
            value: stats.totalApps,
            icon: <Users />,
          },
          { title: "New Today", value: stats.newAppsToday, icon: <UserPlus /> },
          { title: "System Status", value: "Running", icon: <Clock /> },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4"
          >
            <div className="p-3 bg-slate-100 rounded-lg">{item.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="text-xl font-bold">{item.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border h-80">
        <h3 className="font-bold mb-4">
          Position Distribution
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
