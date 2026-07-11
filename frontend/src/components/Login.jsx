import { useState, useContext} from "react";
import { fetchApi } from "../api/fetch.js";
import { useNavigate, Link } from "react-router-dom";
import { LogAndRegContext } from "../hooks/logAndRegContextValue";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(LogAndRegContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchApi("/logReg/login", {
        method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Login response:", response);
      if (response && response.token) {
        login(response.token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in duration-500">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-500 mb-8">Please enter your details.</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
          <input
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />

          <button className="w-full p-4 bg-gray-900 text-white select-none hover:cursor-pointer rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all">
            Login
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
