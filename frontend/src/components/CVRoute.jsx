import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LogAndRegContext } from "../hooks/logAndRegContextValue.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function CVRoute({ children, allowRoles = [] }) {
  const { user, token, loading } = useContext(LogAndRegContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  const userRole = String(user?.role || "")
    .trim()
    .toLowerCase();

  const isAllowed = allowRoles.length === 0 || allowRoles.includes(userRole);

  if (!isAllowed) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
