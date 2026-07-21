import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApi } from "../api/fetch.js";
import { ArrowLeft, Edit, Clock, Tag } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { LogAndRegContext } from "../hooks/logAndRegContextValue.js";

export default function PositionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(LogAndRegContext);
  const [data, setData] = useState(null);

  const userRole = String(user?.role || "")
    .trim()
    .toLowerCase();
  const canEdit = ["admin", "recruiter", "leader"].includes(userRole);
  const canApply = userRole === "candidate";

  useEffect(() => {
    fetchApi(`/position/${id}`)
      .then(setData)
      .catch(() => {
        // Handle error silently
      });
  }, [id]);

  if (!data)
    return (
      <div className="p-8">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center select-none cursor-pointer gap-2 text-slate-600"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <h1 className="text-3xl font-bold text-slate-900">{data.title}</h1>
          <div className="flex flex-wrap gap-2">
            {canApply && (
              <button
                onClick={() => navigate(`/applications/apply/${id}`)}
                className="bg-emerald-50 select-none cursor-pointer text-emerald-700 px-4 py-2 rounded-lg"
              >
                Apply
              </button>
            )}
            {canEdit && (
              <button
                onClick={() => navigate(`/positions/edit/${id}`)}
                className="bg-blue-50 select-none cursor-pointer text-blue-600 p-2 rounded-lg"
              >
                <Edit size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-4 mt-4 mb-8">
          <span className="flex items-center gap-1 text-sm bg-slate-100 px-3 py-1 rounded-full">
            <Clock size={14} /> {new Date(data.createdAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
            <Tag size={14} /> {data.status}
          </span>
        </div>

        <p className="text-slate-600 leading-relaxed text-lg">
          {data.description}
        </p>
      </div>
    </div>
  );
}
