import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);

    async function handleSendOTP() {
        if (!email) {
            return toast.error("Please enter your email address");
        }

        setIsLoading(true);
        try {
            await axios.get(import.meta.env.VITE_BACKEND_URL + "/users/send-otp/" + email);
            toast.success("OTP sent to your email!");
            setStep(2);
        } catch (error) {
            console.log("Forgot password error:", error);
            toast.error(error.response?.data?.message || "Failed to send OTP. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleResetPasswordUpdate() {
        if (!otpCode || !password || !confirmPassword) {
            return toast.error("Please fill in all fields");
        }

        if (password !== confirmPassword) {
            return toast.error("Passwords do not match");
        }

        setIsLoading(true);
        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/validate-otp", {
                email,
                otpCode,
                password,
            });
            toast.success("Password updated successfully!");
            setTimeout(() => {
                window.location.href = "/login";
            }, 2000);
        } catch (error) {
            console.log("Reset password error:", error);
            toast.error(error.response?.data?.message || "Error updating password");
        } finally {
            setIsLoading(false);
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
                        {step === 1 ? "Recover" : "Reset"} <br />
                        <span className="text-white bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                            {step === 1 ? "Your Access" : "Your Password"}
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-gray-400 font-light max-w-md hidden sm:block">
                        {step === 1
                            ? "Don't worry, it happens to the best of us. Enter your email and we'll send you an OTP to reset your password."
                            : "Enter the OTP we sent to your email and choose a strong new password."}
                    </p>
                </div>

                <div className="w-full md:w-1/2 max-w-[450px]">
                    <div className="bg-surface border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl backdrop-blur-xl relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-50"></div>

                        <h2 className="text-2xl sm:text-3xl font-bold font-headings text-white mb-2">
                            {step === 1 ? "Forgot Password?" : "Reset Password"}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8">
                            {step === 1 ? "No problem, enter your details below." : "Enter OTP and new password below."}
                        </p>

                        <div className="space-y-4">
                            {step === 1 && (
                                <div>
                                    <label className="text-xs sm:text-sm font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">Email Address</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-700 text-sm"
                                    />
                                </div>
                            )}

                            {step === 2 && (
                                <>
                                    <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">OTP Code</label>
                                        <input
                                            onChange={(e) => setOtpCode(e.target.value)}
                                            type="text"
                                            placeholder="Enter 6-digit OTP"
                                            className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-700 text-sm text-center tracking-[0.5em] font-bold"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">New Password</label>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-700 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs sm:text-sm font-medium text-gray-400 mb-1.5 block uppercase tracking-widest">Confirm Password</label>
                                        <input
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full h-12 rounded-xl bg-black/40 border border-white/10 text-white px-4 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-gray-700 text-sm"
                                        />
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            onClick={step === 1 ? handleSendOTP : handleResetPasswordUpdate}
                            disabled={isLoading}
                            className="w-full h-12 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold shadow-lg shadow-primary-900/40 hover:shadow-glow transition-all duration-300 uppercase tracking-widest text-xs flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                step === 1 ? "Send Reset OTP" : "Reset Password"
                            )}
                        </button>

                        <div className="mt-8 text-center border-t border-white/5 pt-6">
                            <p className="text-gray-500 text-xs sm:text-sm">
                                {step === 2 && (
                                    <button onClick={() => setStep(1)} className="text-primary-500 hover:text-primary-400 font-bold block mx-auto mb-2">
                                        Change Email / Resend?
                                    </button>
                                )}
                                <Link to="/login" className="text-white hover:text-primary-400 font-bold transition-colors underline underline-offset-4">
                                    Back to Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
