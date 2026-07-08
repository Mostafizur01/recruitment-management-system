import { useState } from "react";
import { fetchApi } from "../api/fetch.js";

export default function ApplyForm({ positionId }) {
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
      alert("Application Submitted Successfully!");
      setFormData({ applicantName: "", email: "", resumeLink: "" });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl border shadow-sm mt-6"
    >
      <h3 className="text-xl font-bold mb-4">Apply for this position</h3>
      <div className="space-y-4">
        <input
          className="w-full border p-3 rounded"
          placeholder="Your Name"
          onChange={(e) =>
            setFormData({ ...formData, applicantName: e.target.value })
          }
          required
        />
        <input
          className="w-full border p-3 rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          className="w-full border p-3 rounded"
          placeholder="Resume/Portfolio Link"
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
  );
}
