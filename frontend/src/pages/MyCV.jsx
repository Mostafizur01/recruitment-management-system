import { useState, useEffect } from "react";
import { fetchApi } from "../api/fetch.js";
import { useAutoSave } from "../hooks/useAutoSave";
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { useNavigate } from "react-router-dom"; 

export default function MyCV() {
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    fetchApi(`/cvs/${userId}`).then((data) => {
      setCv(data);
      setLoading(false);
    });
  }, [userId]);

  if(!userId) navigate('/login')

  useAutoSave(cv, `/cvs/update/${userId}`, () => alert("Conflict detected!"));

  if (loading) return <div className="p-8"><LoadingSpinner /></div>;
  if (!cv) return <div className="p-8">No CV found for this user.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Curriculum Vitae</h1>
        
        <button 
          onClick={() => navigate(`/cvs/edit/${userId}`)} 
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Edit Full Profile
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <textarea
          className="w-full h-80 p-4 border rounded-lg"
          value={cv ? JSON.stringify(cv.cvData, null, 2) : ""}
          onChange={(e) => setCv({ ...cv, cvData: JSON.parse(e.target.value) })}
        />
      </div>
    </div>
  );
}