import { X } from "lucide-react";

export default function AddPositionModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Position</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Position Title
            </label>
            <input
              name="title"
              required
              className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 ring-slate-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              required
              className="w-full border rounded-lg p-2.5 h-24 outline-none focus:ring-2 ring-slate-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-2.5 rounded-lg hover:bg-slate-800 transition"
          >
            Create Position
          </button>
        </form>
      </div>
    </div>
  );
}
    