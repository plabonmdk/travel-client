import React, { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user, updateProfileFunc } = useContext(AuthenticationContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) throw new Error("No user logged in");

      // Update profile in Firebase and local context
      await updateProfileFunc(displayName, photoURL);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        text: "Your profile has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">My Profile</h2>

      <div className="flex flex-col items-center gap-2 mb-6">
        <img
          src={photoURL || "https://i.ibb.co/YTbR9Kp/user.png"}
          className="w-28 h-28 rounded-full border object-cover"
          alt="Profile"
        />
        <h3 className="text-xl font-semibold">{displayName || user?.email}</h3>
        <p className="text-gray-600 text-lg">{user?.email}</p>
      </div>

      <form className="w-full flex flex-col gap-4" onSubmit={handleUpdate}>
        <div>
          <label className="block text-gray-700 mb-1">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
