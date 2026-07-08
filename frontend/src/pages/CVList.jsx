import { useState, useEffect } from "react";
import { fetchApi } from "../api/fetch.js";
import { Link } from "react-router-dom";

export default function CVList() {
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    fetchApi("/cvs").then(setCvs);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Candidate CVs</h1>
      <div className="bg-white rounded-xl border shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-slate-50">
              <th className="p-4 text-left">Candidate Name</th>
              <th className="p-4 text-left">Version</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {cvs.map((cv) => (
              <tr key={cv._id} className="border-b">
                <td className="p-4">{cv.candidateId?.name || "N/A"}</td>
                <td className="p-4">{cv.version}</td>
                <td className="p-4">
                  <Link
                    to={`/cvs/edit/${cv.candidateId?._id}`}
                    className="text-blue-600"
                  >
                    Edit CV
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
