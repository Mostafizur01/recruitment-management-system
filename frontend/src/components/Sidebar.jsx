import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { LogAndRegContext } from "../hooks/logAndRegContextValue";

export default function Sidebar({
  isOpen,
  setIsOpen,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  const { user, logOut, token } = useContext(LogAndRegContext);
  const  navigate = useNavigate()

  const mmrHeandel = ()=> {
    navigate('/')
  }

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
            onClick={mmrHeandel}
          >
            MMR
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <SidebarLink to="/" icon="📊" label="Dashboard" isOpen={isOpen} />
          <SidebarLink to="/my-cvs" icon="📄" label="My CVs" isOpen={isOpen} />
          <SidebarLink
            to="/positions/list"
            icon="💼"
            label="Positions"
            isOpen={isOpen}
          />
        </nav>

        {token ? (
          <div className="p-4 border-t border-slate-700">
            <Link to="/profile/me" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xl">👤</span>
                )}
              </div>
              {isOpen && (
                <div className="overflow-hidden">
                  <p className="text-sm font-semibold truncate">
                    {user?.fastName || "User"}
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
              {isOpen && <span className="ml-3">Logout</span>}
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
        className={`${isOpen ? "block" : "hidden md:hidden"} ml-3 whitespace-nowrap`}
      >
        {label}
      </span>
    </Link>
  );
}
