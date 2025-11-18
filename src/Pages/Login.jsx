import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AuthenticationContext } from "../contexts/AuthContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const {
    signOutUserFunc,
    signInWithEmailAndPasswordFunc,
    signInWithGithubFunc,
    signInWithGoogleFunc,
    user,
    setUser,
  } = useContext(AuthenticationContext);

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithGoogleFunc();
      const signedUser = res.user;
      setUser({
        ...signedUser,
        displayName: signedUser.displayName,
        email: signedUser.email,
        photoURL: signedUser.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png",
      });
      Swal.fire({
        icon: "success",
        title: "Signed In with Google!",
        text: `Welcome, ${signedUser.displayName || "User"}`,
        confirmButtonColor: "#6366f1",
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err.message,
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const res = await signInWithGithubFunc();
      const signedUser = res.user;
      setUser({
        ...signedUser,
        displayName: signedUser.displayName,
        email: signedUser.email,
        photoURL: signedUser.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png",
      });
      Swal.fire({
        icon: "success",
        title: "Signed In with GitHub!",
        text: `Welcome, ${signedUser.displayName || "User"}`,
        confirmButtonColor: "#6366f1",
      });
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: err.message,
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const emailValue = form.email.value.trim();
    const password = form.password.value;

    try {
      const res = await signInWithEmailAndPasswordFunc(emailValue, password);
      const signedUser = res.user;
      setUser({
        ...signedUser,
        displayName: signedUser.displayName,
        email: signedUser.email,
        photoURL: signedUser.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png",
      });
      Swal.fire({
        icon: "success",
        title: "Signed In!",
        text: `Welcome back, ${signedUser.email}`,
        confirmButtonColor: "#6366f1",
      });
      form.reset();
      navigate(from, { replace: true });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutUserFunc();
      setUser(null);
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        confirmButtonColor: "#6366f1",
      });
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
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl">

        <h1 className="text-4xl font-bold text-center text-gray-900 drop-shadow mb-3">
          {user ? "Welcome " : "Welcome Back "}
        </h1>

        {user ? (
          <div className="text-center space-y-4">
            <p className="text-green-600 font-semibold">
              Logged in as {user.email}
            </p>

            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="User Avatar"
              className="mx-auto mt-3 w-24 h-24 rounded-full border-4 border-gray-300 shadow-lg object-cover"
            />

            <h2 className="text-xl font-semibold text-gray-900">
              {user?.displayName || "Anonymous User"}
            </h2>

            <button
              onClick={handleSignOut}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <p className="text-center text-gray-700 mb-6">
              Sign in to continue to your account
            </p>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-gray-900 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-gray-900 mb-1">Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="w-full p-3 rounded-lg bg-gray-100 text-gray-900 outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
                  required
                />
                <div
                  className="absolute right-3 top-10 text-gray-600 cursor-pointer"
                  onClick={() => setShow(!show)}
                >
                  {show ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
                </div>

                <div className="text-right mt-1">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 border border-blue-500 text-blue-500 font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-all duration-300"
              >
                Sign In
              </button>
            </form>

            <div className="flex items-center my-5">
              <hr className="flex-grow border-gray-400" />
              <span className="text-gray-700 px-3">OR</span>
              <hr className="flex-grow border-gray-400" />
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full mb-2 bg-gray-100 flex justify-center items-center gap-2 py-2 rounded-lg shadow hover:bg-gray-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </button>

            <button
              onClick={handleGithubSignIn}
              className="w-full bg-gray-100 flex justify-center items-center gap-2 py-2 rounded-lg shadow hover:bg-gray-200"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="Github"
                className="w-5 h-5"
              />
              Continue with GitHub
            </button>

            <p className="text-center text-sm text-gray-700 mt-5">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-indigo-600 font-medium hover:text-indigo-800"
              >
                Register now
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
