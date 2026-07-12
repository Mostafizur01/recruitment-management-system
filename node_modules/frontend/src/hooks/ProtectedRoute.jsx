import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { LogAndRegContext } from "./logAndRegContextValue.js";
import LoadingSpinner from "../components/LoadingSpinner.jsx";

export default function ProtectedRoute({ children }) {
  const { token, loading } = useContext(LogAndRegContext);
  if (loading) return <LoadingSpinner />;
  return token ? children : <Navigate to="/login" />;
}
