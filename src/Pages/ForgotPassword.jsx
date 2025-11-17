import React, { useState, useContext } from "react";
import { Link } from "react-router"; // Fixed import
import Swal from "sweetalert2";
import bgImage from "../assets/Untitled design (32).png";
import { AuthenticationContext } from "../contexts/AuthContext";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { sendPassResetEmailFunc } = useContext(AuthenticationContext);

  const handleForgot = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email Required",
        text: "Please enter your email address first!",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    try {
      await sendPassResetEmailFunc(email); // make sure this returns a promise
      Swal.fire({
        icon: "success",
        title: "Password Reset Email Sent!",
        text: "Check your inbox for password reset instructions.",
        confirmButtonColor: "#6366f1",
      });
      setEmail("");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-bold text-center text-white drop-shadow mb-3">
          Forgot Password
        </h1>

        <p className="text-center text-gray-200 mb-6">
          Enter your email to receive a password reset link.
        </p>

        <form onSubmit={handleForgot} className="space-y-4">
          <div>
            <label className="block text-gray-100 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/80 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm text-gray-200 mt-5">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-yellow-300 font-medium hover:text-yellow-400"
          >
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
