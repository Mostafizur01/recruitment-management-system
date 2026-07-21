import { useState, useEffect, useContext } from "react";
import { fetchApi } from "../api/fetch.js";
import { Link } from "react-router-dom";
import { LogAndRegContext} from "../hooks/logAndRegContextValue.js"

export default function CVList() {
  const [cvs, setCvs] = useState([]);
  const { user } =  useContext(LogAndRegContext)

  const userRole = String(user?.role || "").trim().toLowerCase()

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
                <td className="p-4">
                  {cv.candidateId?.firstName || ""}{" "}
                  {cv.candidateId?.lastName || ""}
                </td>
                <td className="p-4">{cv.version}</td>
                {userRole !== "recruiter" ? (
                  <td className="p-4">
                  <Link
                    to={`/cvs/edit/${cv.candidateId?._id}`}
                    className="text-blue-600"
                  >
                    Edit CV
                  </Link>
                </td>
                ) : (
                  <div className="text-blue-500">Active</div>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
