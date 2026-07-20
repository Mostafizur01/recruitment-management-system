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
        // Handle error silently
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  useEffect(() => {
    const loadProfilePhoto = async () => {
      try {
        const response = await fetchApi(`/users/${user.id}/photo`);
        if (response && response.photoUrl) {
          setProfile((prevProfile) => ({
            ...prevProfile,
            Photo: response.photoUrl,
          }));
        }
      } catch (error) {
        console.log("Error on loading profile photo:", error);
      }
    };
    loadProfilePhoto();
  }, [user.id]);

  if (loading)
    return (
      <div className="p-8">
        <LoadingSpinner />
      </div>
    );

  if (!profile) return <div className="p-8">Profile data unavailable.</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border">
      {!profile.Photo ? (
        <div className="flex items-center gap-4 md-6 justify-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl font-bold">
            {profile.firstName[0]}
          </div>
        </div>
      ) : (
        <img
          src={profile.Photo}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover"
        />
      )}
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div></div>
      <div className="grid grid-cols-1 mt-6 md:grid-cols-2 gap-6">
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
