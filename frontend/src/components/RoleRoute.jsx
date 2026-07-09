import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LogAndRegContext } from "../hooks/logAndRegContextValue.js";

export default function RoleRoute({ children, allowedRoles }) {
  const { user } = useContext(LogAndRegContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const normalizedRoles = allowedRoles.map((role) => role.toLowerCase());
  const userRole = user?.role?.toLowerCase();

  if (!normalizedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
}
