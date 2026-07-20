import { useState, useContext } from "react";
import { fetchApi } from "../api/fetch.js";
import { useNavigate, Link } from "react-router-dom";
import { LogAndRegContext } from "../hooks/logAndRegContextValue";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(LogAndRegContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetchApi("/logReg/login", {
        method: "POST",
        body: formData,
      });

      if (!res.user || !res.token) {
        throw new Error("Invalid response from server");
      }

      login(res.user, res.token);

      // Redirect based on role
      const userRole = String(res.user?.role || "")
        .trim()
        .toLowerCase();

      if (userRole === "candidate") {
        // For candidates without profile photo, suggest profile setup
        if (!res.user.Photo) {
          // Redirect to profile setup
          navigate("/");
        } else {
          navigate("/my-cv");
        }
      } else if (["recruiter", "admin"].includes(userRole)) {
        navigate("/positions/list");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in duration-500">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 mb-8">Please enter your details.</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
            disabled={loading}
          />
          <input
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-gray-900 text-white select-none hover:cursor-pointer rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
