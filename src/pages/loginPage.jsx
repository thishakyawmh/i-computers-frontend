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
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                email: email,
                password: password,
            });
            console.log(res);

            if (res.data.role === "admin") {

                navigate("/admin");

            }else{

                navigate("/");

            }


            toast.success("Login successful!");
        } catch (error) {
            toast.error("Login failed. Please try again.");
            console.log("Login error:", error);
        }
    }

    return (
        <div className="w-full h-screen bg-[url('/login_bg.jpg')] bg-cover bg-center bg-no-repeat flex items-center">
            <div className="w-1/2 h-full flex flex-col justify-center items-center px-8">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-[260px] h-auto mb-4 object-contain"
                />
                <h1 className="text-[42px] text-white text-shadow-2xs font-bold text-center text-shadow-accent">
                    Power Up Your World
                </h1>
                <p className="text-[16px] text-white font-semibold text-center italic max-w-md mt-2">
                    Your trusted partner for all things tech.
                </p>
            </div>

            <div className="w-1/2 flex justify-center items-center px-8">
                <div className="w-[420px] py-10 login-card backdrop-blur-md shadow-2xl rounded-xl flex flex-col justify-center items-center">
                    <h1 className="text-[36px] font-bold mb-6 text-white">Login</h1>
                    <input
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        type="text"
                        placeholder="Email"
                        className="w-[360px] h-[48px] rounded-lg mb-4 px-4 text-[16px] outline-none login-input focus:bg-transparent"
                    />

                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        type="password"
                        placeholder="Password"
                        className="w-[360px] h-[48px] rounded-lg mb-2 px-4 text-[16px] outline-none login-input focus:bg-transparent"
                    />

                    <p className="w-[360px] text-left text-white text-sm mb-4">
                        <span className="text-gray-200 mr-1">Forgot password?</span>
                        <Link to="" className="text-accent font-bold italic">
                            Reset
                        </Link>
                    </p>

                    <button
                        onClick={login}
                        className="w-[360px] h-[48px] bg-accent text-white rounded-lg text-[18px] font-bold hover:bg-accent-dark transition-colors mb-4"
                    >
                        Login
                    </button>

                    <p className="text-white text-sm mb-1">
                        Don't have an account?{" "}
                        <Link to="" className="text-accent font-bold italic">
                            Register here
                        </Link>
                    </p>

                    
                </div>
            </div>
        </div>
    );
}
