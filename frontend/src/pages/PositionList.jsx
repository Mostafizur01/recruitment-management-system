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
  const userRole = storedUser?.role?.toLowerCase();
  const isAuthorized = ["admin", "recruiter", "leader"].includes(userRole);

  const loadPositions = async () => {
    try {
      const data = await fetchApi("/position");
      setPositions(data);
    } catch (error) {
      console.error("Failed to load positions:", error);
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
            className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={18} /> <span className="hidden md:inline">Add New</span>
          </button>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">New Position</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddPosition} className="space-y-4">
              <input
                className="w-full border p-2 rounded"
                placeholder="Title"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
              <textarea
                className="w-full border p-2 rounded"
                placeholder="Description"
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
              <button className="w-full bg-slate-900 text-white py-2 rounded">
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
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left hidden md:table-cell">
                Status
              </th>
              <th className="px-4 py-3 text-right">Actions</th>
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
                <tr key={pos._id} className="border-b">
                  <td className="px-4 py-3">{pos.title}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    {pos.status}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {isAuthorized ? (
                      <>
                        <button
                          onClick={() => navigate(`/positions/edit/${pos._id}`)}
                          className="text-blue-600"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(pos._id)}
                          className="text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-400 text-xs">Read Only</span>
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
