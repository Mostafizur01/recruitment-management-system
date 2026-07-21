import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LogAndRegContext } from "../hooks/logAndRegContextValue";
import { fetchApi } from "../api/fetch";

export default function Sidebar({
  isOpen,
  setIsOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const { user, logOut, token } = useContext(LogAndRegContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const userRole = String(user?.role || "")
    .trim()
    .toLowerCase();

  const handleMobileMenuClick = () => {
    navigate("/");
  };
  useEffect(() => {
    const userId = user?._id || user?.id;

    const loadProfilePhoto = async () => {
      if (!userId) return;
      try {
        const response = await fetchApi(`/users/me`);
        if (response) {
          setProfile(response);
        }
      } catch (error) {
        console.error("Error loading profile photo:", error);
      }
    };

    if (token) {
      loadProfilePhoto();
    }
  }, [token]);

  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`${isOpen ? "md:w-64" : "md:w-20"} 
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed md:static select-none inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out 
        bg-slate-900 text-white flex flex-col md:translate-x-0 w-64`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div className="p-6 border-b border-slate-700">
          <div
            className={`${isOpen ? "text-4xl" : "text-sm"} hover:cursor-pointer hover:text-blue-500 transition-all duration-300 font-bold text-center`}
            onClick={handleMobileMenuClick}
          >
            MMR
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <SidebarLink to="/" icon="📊" label="Dashboard" isOpen={isOpen} />
          {userRole === "candidate" && (
            <SidebarLink to="/my-cv" icon="📄" label="My CV" isOpen={isOpen} />
          )}
          <SidebarLink
            to="/positions/list"
            icon="💼"
            label="Positions"
            isOpen={isOpen}
          />
          {userRole !== "candidate" && (
            <SidebarLink
              to="/applications/list"
              icon="📋"
              label="Applications List"
              isOpen={isOpen}
            />
          )}
          {userRole !== "candidate" && (
            <SidebarLink
              to="/cvs"
              icon="📄"
              label="Candidate CVs"
              isOpen={isOpen}
            />
          )}
        </nav>

        {token ? (
          <div className="p-4 border-t border-slate-700">
            <Link to="/profile/me" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                {profile?.Photo ? (
                  <img
                    src={profile.Photo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">👤</span>
                )}
              </div>
              {isOpen && (
                <div className="overflow-hidden duration-300">
                  <p className="text-sm font-semibold truncate">
                    {user?.firstName
                      ? `${user.firstName} ${user.lastName || ""}`
                      : "User"}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email || "No email"}
                  </p>
                </div>
              )}
            </Link>

            <button
              onClick={logOut}
              className="flex items-center w-full p-2 text-red-400 hover: hover:bg-slate-800 hover:cursor-pointer rounded transition-all"
            >
              <span className="text-xl">↪️</span>
              {isOpen && <span className="ml-3 duration-300">Logout</span>}
            </button>
          </div>
        ) : null}
      </aside>
    </>
  );
}

function SidebarLink({ to, icon, label, isOpen }) {
  return (
    <Link
      to={to}
      className="flex items-center p-2 rounded hover:bg-slate-800 hover:text-blue-500 transition-all"
    >
      <span className="text-xl">{icon}</span>
      <span
        className={`${isOpen ? "block" : "hidden md:block text-transparent duration-300"} ml-3 whitespace-nowrap`}
      >
        {label}
      </span>
    </Link>
  );
}
  