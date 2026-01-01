import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/users/login",
        {
          email: email,
          password: password,
        }
      );
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
    <div className="w-full min-h-screen bg-black flex items-center justify-center relative overflow-hidden py-12 px-6">
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-900/20 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-600/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none"></div>

      <div className="w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20 z-10">

        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <img src="/logo.png" alt="logo" className="w-[50px] sm:w-[60px] h-auto object-contain" />
            <span className="text-3xl sm:text-4xl font-bold text-white font-headings tracking-wider">ICM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold font-headings leading-tight mb-4 sm:mb-6">
            Power Up <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Your World</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 font-light max-w-md hidden sm:block">
            Your trusted partner for premium high-performance computing. Access your account to manage orders and settings.
          </p>
        </div>

        <div className="w-full md:w-1/2 max-w-[450px]">
          <div className="bg-surface border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

            <h2 className="text-2xl sm:text-3xl font-bold font-headings text-white mb-2">Welcome Back</h2>
            <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">Please enter your details to sign in.</p>

            <div className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">Email Address</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@example.com"
                  className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-700 text-sm"
                />
              </div>

              <div>
                <label className="text-xs sm:text-sm font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">Password</label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-700 text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4 mb-6">
              <Link to="" className="text-xs text-primary-500 hover:text-primary-400 font-bold transition-colors uppercase tracking-widest">
                Forgot password?
              </Link>
            </div>

            <button
              onClick={login}
              className="w-full h-12 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-lg shadow-primary-900/40 hover:shadow-glow transition-all duration-300 uppercase tracking-widest text-xs"
            >
              Sign In Now
            </button>

            <div className="mt-8 text-center border-t border-white/5 pt-6">
              <p className="text-gray-500 text-xs sm:text-sm">
                Don't have an account?{" "}
                <Link to="/register" className="text-white hover:text-primary-400 font-bold transition-colors underline underline-offset-4">
                  Register Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
