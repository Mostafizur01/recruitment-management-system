import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApi } from "../api/fetch.js";
import { useAutoSave } from "../hooks/useAutoSave";
import ConflictModal from "../components/ConflictModal.jsx";
import { ArrowLeft } from "lucide-react";

export default function PositionEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConflict, setShowConflict] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchApi(`/position/${id}`);
        setData(result);
      } catch (err) {
        console.error("Failed to load:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  useAutoSave(data, `/position/${id}`, () => setShowConflict(true));

  if (loading) return <div className="p-8">Loading...</div>;
  if (!data) return <div className="p-8">Position not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft />
        </button>
        <h1 className="text-2xl font-bold">Edit Position: {data.title}</h1>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Job Title</label>
          <input
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            className="w-full p-3 border rounded-lg h-48 focus:ring-2 focus:ring-blue-500 outline-none"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
          />
        </div>

        <div className="text-sm text-gray-400">
          Auto-saving changes... (Version: {data.version})
        </div>
      </div>

      <ConflictModal
        isOpen={showConflict}
        onReload={() => window.location.reload()}
      />
    </div>
  );
}
