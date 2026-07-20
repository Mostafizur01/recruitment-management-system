import { useState, useEffect, useContext } from "react";
import { fetchApi } from "../api/fetch.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { LogAndRegContext } from "../hooks/logAndRegContextValue.js";

export default function MyCV() {
  const { user } = useContext(LogAndRegContext);
  const [cv, setCv] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    summary: "",
    skills: [],
    experience: [],
  });

  // Check if user is Recruiter - they should only view
  const isRecruiter =
    String(user?.role || "")
      .trim()
      .toLowerCase() === "recruiter";
  const isCandidate =
    String(user?.role || "")
      .trim()
      .toLowerCase() === "candidate";

  useEffect(() => {
    const loadCVAndProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const profileData = await fetchApi("/users/me");
        setUserProfile(profileData);

        const cvData = await fetchApi(`/cvs/${user._id}`);
        setCv(cvData);
        if (cvData?.cvData) {
          setFormData(cvData.cvData);
        }
      } catch {
        setError(null);
      } finally {
        setLoading(false);
      }
    };
    if (!user?._id) return;
    loadCVAndProfile();
  }, [user?._id]);

  const handleCreateCV = async () => {
    setLoading(true);
    try {
      const newCv = await fetchApi("/cvs/create", {
        method: "POST",
        body: JSON.stringify({
          cvData: {
            summary: "",
            skills: [],
            experience: [],
          },
        }),
      });
      setCv(newCv);
      setFormData(newCv.cvData);
      setEditMode(true);
    } catch (err) {
      setError(err.message || "Failed to create CV");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCV = async () => {
    setLoading(true);
    try {
      const response = await fetchApi(`/cvs/update/${user._id}`, {
        method: "PUT",
        body: JSON.stringify({ cvData: formData }),
      });
      setCv(response);
      setEditMode(false);
      alert("CV saved successfully!");
    } catch (err) {
      setError(err.message || "Failed to save CV");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = () => {
    setFormData({
      ...formData,
      skills: [...(formData.skills || []), ""],
    });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, skills: updatedSkills });
  };

  const handleRemoveSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index),
    });
  };

  const handleAddExperience = () => {
    setFormData({
      ...formData,
      experience: [
        ...(formData.experience || []),
        { company: "", position: "", duration: "", description: "" },
      ],
    });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExp = [...formData.experience];
    updatedExp[index] = { ...updatedExp[index], [field]: value };
    setFormData({ ...formData, experience: updatedExp });
  };

  const handleRemoveExperience = (index) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
    });
  };

  const handlePhotoUpdate = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        setLoading(true);
        const photoUrl = reader.result;

        await fetchApi(`/users/${user._id}/photo`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ photoUrl }),
        });

        setUserProfile((prev) => ({ ...prev, Photo: photoUrl }));
        alert("Photo updated successfully!");
      } catch {
        alert("Failed to update photo. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  if (loading) return <LoadingSpinner />;

  if (!cv) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-12">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12 border-2 border-dashed border-blue-200">
            <div className="text-6xl mb-6">📄</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              No CV Found
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Create your first CV to get started with your job application
              journey.
            </p>
            {isCandidate && (
              <button
                onClick={handleCreateCV}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 inline-flex items-center gap-2"
              >
                <span>➕</span>
                Create Your CV
              </button>
            )}
            {isRecruiter && (
              <div className="text-blue-600 font-semibold">
                This candidate hasn't created a CV yet.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // CV Exists - View/Edit Mode
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl font-bold text-gray-900">
              {editMode ? "Edit Your CV" : "My Curriculum Vitae"}
            </h1>
            {isCandidate && !editMode && (
              <button
                onClick={() => setEditMode(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <span>✏️</span>
                Edit
              </button>
            )}
            {editMode && (
              <button
                onClick={handleSaveCV}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <span>💾</span>
                Save
              </button>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
              <p className="text-red-700 font-semibold">Error</p>
              <p className="text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* Profile Section */}
        {userProfile && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
            <div className="relative group w-24 h-24">
              {userProfile.Photo ? (
                <img
                  src={userProfile.Photo}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-white/20 border-4 border-white flex items-center justify-center text-3xl">
                  👤
                </div>
              )}

              {isCandidate && (
                <label className="absolute bottom-0 right-0 bg-white text-blue-600 p-1.5 rounded-full cursor-pointer shadow-lg hover:bg-gray-100">
                  📷
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handlePhotoUpdate}
                  />
                </label>
              )}
            </div>
          </div>
        )}

        {/* Summary Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6 border-l-4 border-blue-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>💼</span> Professional Summary
          </h3>
          {editMode ? (
            <textarea
              value={formData.summary || ""}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              placeholder="Write a brief professional summary about yourself..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none h-28 font-normal"
            />
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {formData.summary || "No summary added yet"}
            </p>
          )}
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6 border-l-4 border-purple-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>⭐</span> Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {formData.skills && formData.skills.length > 0 ? (
              formData.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  {editMode ? (
                    <>
                      <input
                        type="text"
                        value={skill}
                        onChange={(e) =>
                          handleSkillChange(index, e.target.value)
                        }
                        placeholder="Skill name"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      <button
                        onClick={() => handleRemoveSkill(index)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                      >
                        🗑️
                      </button>
                    </>
                  ) : (
                    <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-medium w-full">
                      {skill}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No skills added yet</p>
            )}
          </div>
          {editMode && (
            <button
              onClick={handleAddSkill}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span>➕</span>
              Add Skill
            </button>
          )}
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6 border-l-4 border-green-500">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span>🎯</span> Experience
          </h3>
          <div className="space-y-6">
            {formData.experience && formData.experience.length > 0 ? (
              formData.experience.map((exp, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 ${
                    editMode
                      ? "border-gray-300 bg-gray-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  {editMode ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "company",
                              e.target.value,
                            )
                          }
                          placeholder="Company Name"
                          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "position",
                              e.target.value,
                            )
                          }
                          placeholder="Job Position"
                          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                      </div>
                      <input
                        type="text"
                        value={exp.duration}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "duration",
                            e.target.value,
                          )
                        }
                        placeholder="Duration (e.g., Jan 2020 - Dec 2021)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none mb-4"
                      />
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Job description and responsibilities"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none h-24 mb-4"
                      />
                      <button
                        onClick={() => handleRemoveExperience(index)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
                      >
                        <span>🗑️</span>
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">
                            {exp.position}
                          </h4>
                          <p className="text-lg font-semibold text-green-600">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-gray-500 text-sm">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {exp.description}
                      </p>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No experience added yet</p>
            )}
          </div>
          {editMode && (
            <button
              onClick={handleAddExperience}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <span>➕</span>
              Add Experience
            </button>
          )}
        </div>

        {/* CV Metadata */}
        <div className="bg-gray-100 rounded-xl p-4 text-center text-gray-600 text-sm">
          <p>
            CV Version: <span className="font-bold">{cv.version}</span> | Last
            Updated:{" "}
            <span className="font-bold">
              {new Date(cv.updatedAt).toLocaleDateString()}
            </span>
          </p>
        </div>

        {/* Recruiter Notice */}
        {isRecruiter && (
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-blue-700 font-semibold">
              👁️ View Only Mode: You are viewing this CV as a recruiter. Edit
              and create functionality is restricted to candidates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
