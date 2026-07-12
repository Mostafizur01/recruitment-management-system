import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchApi } from "../api/fetch.js";

export default function Application() {
  const { positionId } = useParams();
  const [formData, setFormData] = useState({
    applicantName: "",
    email: "",
    resumeLink: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchApi(`/applications/apply/${positionId}`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      alert("Application submitted successfully!");
      setFormData({ applicantName: "", email: "", resumeLink: "" });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl border shadow-sm"
      >
        <h3 className="text-xl font-bold mb-4">Apply for this position</h3>
        <div className="space-y-4">
          <input
            className="w-full border p-3 rounded"
            placeholder="Your Name"
            value={formData.applicantName}
            onChange={(e) =>
              setFormData({ ...formData, applicantName: e.target.value })
            }
            required
          />
          <input
            className="w-full border p-3 rounded"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            className="w-full border p-3 rounded"
            placeholder="Resume/Portfolio Link"
            value={formData.resumeLink}
            onChange={(e) =>
              setFormData({ ...formData, resumeLink: e.target.value })
            }
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded font-bold hover:bg-blue-700"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
