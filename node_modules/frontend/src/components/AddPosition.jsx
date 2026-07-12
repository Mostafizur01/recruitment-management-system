import { useState } from "react";
import { fetchApi } from "../api/fetch";

export default function AddPositionModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Active",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchApi("/position", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      onSave();
      onClose();
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Add New Position</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border p-3 rounded-lg"
            placeholder="Position Title"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <textarea
            className="w-full border p-3 rounded-lg h-24"
            placeholder="Description"
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <select
            className="w-full border p-3 rounded-lg"
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 hover:cursor-pointer select-none bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 hover:cursor-pointer select-none bg-slate-900 text-white rounded-lg hover:bg-slate-700"
            >
              Save Position
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
