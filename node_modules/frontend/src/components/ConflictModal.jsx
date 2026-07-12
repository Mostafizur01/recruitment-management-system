export default function ConflictModal({ isOpen, onReload }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-xl">
        <h2 className="text-lg font-bold text-red-600">Conflict Detected!</h2>
        <p className="mt-2 text-sm">Can you save new data?</p>
        <div className="mt-4 flex gap-2">
          <button onClick={onReload} className="bg-blue-600 text-white px-4 py-2 rounded">Reload Page</button>
        </div>
      </div>
    </div>
  );
}