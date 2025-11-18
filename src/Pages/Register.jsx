import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { updateProfile, signOut } from "firebase/auth";
import Swal from "sweetalert2";

import { AuthenticationContext } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase";

const Register = () => {
  const [show, setShow] = useState(false);
  const { createUserWithEmailAndPasswordFunc } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photo = form.photo.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        html: `
          Password must meet the following rules:<br/>
          - Minimum 8 characters<br/>
          - At least 1 uppercase letter<br/>
          - At least 1 lowercase letter<br/>
          - At least 1 number<br/>
          - At least 1 special character (@$!%*?&)
        `,
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

    try {
      // Create user
      const userCredential = await createUserWithEmailAndPasswordFunc(email, password);
      const user = userCredential.user;

      // Update profile
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      // Sign out immediately
      await signOut(auth);

      // Success toast
      Swal.fire({
        icon: "success",
        title: `Welcome, ${name}!`,
        text: "Your account has been created successfully. Please sign in to continue.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "rgba(0,0,0,0.7)",
        color: "#fff",
      });

      form.reset();
      navigate("/login"); // সরাসরি login page এ নিয়ে যাবে
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Create an Account
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Join us and start your journey today!
        </p>

        <form onSubmit={handleRegister}>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="input input-bordered w-full bg-gray-100 text-gray-800"
              required
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full bg-gray-100 text-gray-800"
            />
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-gray-100 text-gray-800"
              required
            />
          </div>

          <div className="form-control mb-4 relative">
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Password</span>
            </label>
            <input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-gray-100 text-gray-800"
              required
            />
            <div
              className="absolute right-3 top-10 text-gray-600 cursor-pointer"
              onClick={() => setShow(!show)}
            >
              {show ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
            </div>
          </div>

          <button className="btn bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-pink-600 w-full mt-2 text-white font-semibold border-none">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="link link-hover text-indigo-600 font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
