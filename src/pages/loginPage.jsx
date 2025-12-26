import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    console.log("email:", email);
    console.log("password:", password);

    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(res);
      if (res?.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      if (res.data?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.log("Login error:", error);
    }
  }

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 px-6 z-10">

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="logo" className="w-[60px] h-auto object-contain" />
            <span className="text-4xl font-bold text-white font-headings tracking-wider">ICM</span>
          </div>

          <h1 className="text-5xl md:text-6xl text-white font-bold font-headings leading-tight mb-6">
            Power Up <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Your World</span>
          </h1>
          <p className="text-lg text-gray-400 font-light max-w-md">
            Your trusted partner for premium high-performance computing. Access your account to manage orders and settings.
          </p>
        </div>

        <div className="w-full md:w-1/2 max-w-[450px]">
          <div className="bg-surface border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

            <h2 className="text-3xl font-bold font-headings text-white mb-2">Welcome Back</h2>
            <p className="text-gray-500 mb-8">Please enter your details to sign in.</p>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400 mb-1.5 block">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-400 mb-1.5 block">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl bg-black/50 border border-white/10 text-white px-4 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 mb-6">
              <Link to="" className="text-sm text-primary-500 hover:text-primary-400 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            <button
              onClick={login}
              className="w-full h-12 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-lg shadow-primary-900/20 hover:shadow-glow transition-all duration-300"
            >
              Sign In
            </button>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-gray-500 text-sm">
                Don't have an account?{" "}
                <Link to="" className="text-white hover:text-primary-400 font-semibold transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
