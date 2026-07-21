import { useState, useEffect } from "react";
import { fetchApi } from "../api/fetch.js";
import { useNavigate } from "react-router-dom";
import { Edit, Plus, Trash2, X } from "lucide-react";

export default function PositionList() {
  const [positions, setPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Active",
  });

  const navigate = useNavigate();
  const storedUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;
  const userRole = String(storedUser?.role || "")
    .trim()
    .toLowerCase();
  const isAuthorized = ["admin", "recruiter"].includes(userRole);

  const loadPositions = async () => {
    try {
      const data = await fetchApi("/position");
      setPositions(data);
    } catch {
      // Handle error silently
    }
  };

  useEffect(() => {
    loadPositions();
  }, []);

  const handleAddPosition = async (e) => {
    e.preventDefault();
    await fetchApi("/position", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    setIsModalOpen(false);
    loadPositions();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this position?")) {
      await fetchApi(`/position/${id}`, { method: "DELETE" });
      loadPositions();
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-2xl font-bold">Positions</h1>
        {isAuthorized && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 select-none cursor-pointer text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800 transition-colors"
          >
            <Plus size={18} /> <span className="hidden md:inline">Add New</span>
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between mb-4 items-center">
              <h2 className="text-lg font-bold">New Position</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 select-none cursor-pointer hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddPosition} className="space-y-4">
              <input
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <textarea
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="Description"
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
              <button className="w-full bg-slate-900 select-none cursor-pointer text-white py-2 rounded hover:bg-slate-800 transition-colors">
                Save
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left hidden md:table-cell font-semibold text-gray-700">
                Status
              </th>
              <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-4 py-8 text-center text-gray-500">
                  No positions found.
                </td>
              </tr>
            ) : (
              positions.map((pos) => (
                <tr key={pos._id} className="border-b hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{pos.title}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {pos.status || "Active"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {isAuthorized ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/positions/edit/${pos._id}`)}
                          className="p-1.5 text-blue-600 select-none cursor-pointer hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(pos._id)}
                          className="p-1.5 text-red-500 select-none cursor-pointer hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="text-indigo-600 select-none cursor-pointer hover:text-indigo-900 bg-indigo-50 px-3 py-1 rounded-md text-sm font-medium transition-colors" 
                        onClick={() => navigate(`/positions/${pos._id}`)}
                      >
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}