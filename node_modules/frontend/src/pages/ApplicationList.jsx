import { useState, useEffect } from "react";
import { fetchApi } from "../api/fetch.js";

export default function ApplicationList() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApi("/applications").then(setApplications);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Recent Applications</h2>
      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left">Applicant</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">
                  Position
                </th>
                <th className="px-6 py-3 text-left">Resume</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">{app.applicantName}</td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    {app.positionId?.title}
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href={app.resumeLink}
                      target="_blank"
                      className="text-blue-600 font-medium hover:underline"
                    >
                      View Resume
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
