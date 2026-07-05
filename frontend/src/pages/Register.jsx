import { useState } from "react";
import { fetchApi } from "../api/fetch";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetchApi("/logReg/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in duration-500">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 mb-8">Join our community today.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="text"
            placeholder="Full Name"
            onChange={(e) =>
              setFormData({ ...formData, fastName: e.target.value })
            }
            required
          />
          <input
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, fastName: e.target.value })
            }
            required
          />
          <input
            className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, fastName: e.target.value })
            }
            required
          />

          <button className="w-full p-4 bg-blue-600 select-none hover:cursor-pointer text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all">
            Register
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
