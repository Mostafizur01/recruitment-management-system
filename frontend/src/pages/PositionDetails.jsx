import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchApi } from "../api/fetch.js";
import { ArrowLeft, Edit, Clock, Tag } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function PositionDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchApi(`/positions/${id}`).then(setData);
  }, [id]);

  if (!data)
    return (
      <div className="p-8">
        {" "}
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-slate-600"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-sm border">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-slate-900">{data.title}</h1>
          <button
            onClick={() => navigate(`/positions/edit/${id}`)}
            className="bg-blue-50 text-blue-600 p-2 rounded-lg"
          >
            <Edit size={20} />
          </button>
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
