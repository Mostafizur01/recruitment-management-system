import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../api/fetch.js";
import { useAutoSave } from "../hooks/useAutoSave.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function CVEdit() {
  const { candidateId } = useParams();
  const [cv, setCv] = useState(null);
  const [showConflict, setShowConflict] = useState(false);

  useEffect(() => {
    fetchApi(`/cvs/${candidateId}`).then(setCv);
  }, [candidateId]);

  useAutoSave(cv, `/cvs/update/${candidateId}`, () => setShowConflict(true));

  if (!cv) return <LoadingSpinner />;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        Edit CV (Version: {cv.version})
      </h2>
      <textarea
        className="w-full h-96 p-4 border rounded-lg"
        value={JSON.stringify(cv.cvData, null, 2)}
        onChange={(e) => setCv({ ...cv, cvData: JSON.parse(e.target.value) })}
      />
      {showConflict && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Data outdated! Please refresh.
        </div>
      )}
    </div>
  );
}
