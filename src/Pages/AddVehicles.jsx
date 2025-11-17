import React, { useState, useEffect, useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const AddVehicles = () => {
  const { user } = useContext(AuthenticationContext);

  const [formData, setFormData] = useState({
    vehicleName: "",
    owner: "",
    category: "",
    pricePerDay: "",
    location: "",
    availability: "",
    description: "",
    coverImage: "",
    userEmail: "",
    categories: "",
    addedAt: "",
  });

  // Auto set user email & initial datetime
  useEffect(() => {
    const now = new Date().toISOString();
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        userEmail: user.email,
        addedAt: now,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      addedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:3000/travel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
        
      });

      if (!response.ok) {
        throw new Error("Failed to add vehicle. Please try again.");
      }

      Swal.fire({
        icon: "success",
        title: "Vehicle Added",
        text: "Your vehicle has been added successfully!",
        confirmButtonColor: "#3085d6",
      });

      
      setFormData({
        vehicleName: "",
        owner: "",
        category: "",
        pricePerDay: "",
        location: "",
        availability: "",
        description: "",
        coverImage: "",
        userEmail: user?.email || "",
        categories: "",
        addedAt: new Date().toISOString(),
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 pt-24 pb-10 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-xl p-8 rounded-2xl border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Add New Vehicle
        </h2>

        {formData.addedAt && (
          <p className="text-sm text-gray-600 mb-4 text-right">
            Added Time: {new Date(formData.addedAt).toLocaleString()}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Vehicle Name
            </label>
            <input
              type="text"
              name="vehicleName"
              placeholder="Suzuki Every"
              value={formData.vehicleName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Owner Name
            </label>
            <input
              type="text"
              name="owner"
              placeholder="Owner's name"
              value={formData.owner}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

         
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            >
              <option value="">Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

         
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Price Per Day ($)
            </label>
            <input
              type="number"
              name="pricePerDay"
              placeholder="55"
              value={formData.pricePerDay}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Chittagong, Bangladesh"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Availability
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            >
              <option value="">Select</option>
              <option value="Available">Available</option>
              <option value="Booked">Booked</option>
            </select>
          </div>

          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Mini van suitable for small group trips."
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              rows="3"
              required
            />
          </div>

          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Cover Image URL
            </label>
            <input
              type="text"
              name="coverImage"
              placeholder="https://i.ibb.co.com/your-image.jpg"
              value={formData.coverImage}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Categories
            </label>
            <input
              type="text"
              name="categories"
              placeholder="Van"
              value={formData.categories}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 outline-none"
              required
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicles;
