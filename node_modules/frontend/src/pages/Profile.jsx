import { useState, useEffect, useContext } from "react";
import { fetchApi } from "../api/fetch.js";
import { LogAndRegContext } from "../hooks/logAndRegContextValue.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function Profile() {
  const { user } = useContext(LogAndRegContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadProfile = async () => {
      try {
        const data = await fetchApi("/users/me");
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  if (loading)
    return (
      <div className="p-8">
        <LoadingSpinner />
      </div>
    );
  if (!profile) return <div className="p-8">Profile data unavailable.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-500">First Name</label>
            <p className="mt-1 text-lg font-medium">{profile.firstName}</p>
          </div>
          <div>
            <label className="block text-sm text-slate-500">Last Name</label>
            <p className="mt-1 text-lg font-medium">{profile.lastName}</p>
          </div>
          <div>
            <label className="block text-sm text-slate-500">Email</label>
            <p className="mt-1 text-lg font-medium">{profile.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-slate-500">Role</label>
            <p className="mt-1 text-lg font-medium">{profile.role}</p>
          </div>
          <div>
            <label className="block text-sm text-slate-500">Location</label>
            <p className="mt-1 text-lg font-medium">{profile.location}</p>
          </div>
          <div>
            <label className="block text-sm text-slate-500">Joined</label>
            <p className="mt-1 text-lg font-medium">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
