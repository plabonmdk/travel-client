import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../contexts/AuthContext";

const UpdateVehicle = () => {
  const { id } = useParams();
  const { user } = useContext(AuthenticationContext);
  const [travel, setTravel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchVehicle = async () => {
      try {
        const res = await fetch(`http://localhost:3000/my-vehicles?email=${id}`, {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const data = await res.json();
        setTravel(data.result);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch vehicle data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      vehicleName: e.target.vehicleName.value,
      owner: e.target.owner.value,
      category: e.target.category.value,
      pricePerDay: Number(e.target.pricePerDay.value),
      location: e.target.location.value,
      availability: e.target.availability.value,
      description: e.target.description.value,
      coverImage: e.target.coverImage.value,
      categories: e.target.categories.value,
    };

    try {
      const res = await fetch(`http://localhost:3000/travel/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Vehicle updated successfully!",
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Failed to update.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
      });
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading vehicle data...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="card bg-white w-full max-w-lg shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Update Vehicle</h2>
        {travel && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="label font-medium">Vehicle Name</label>
              <input
                type="text"
                name="vehicleName"
                defaultValue={travel.vehicleName}
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300"
              />
            </div>

            <div>
              <label className="label font-medium">Owner</label>
              <input
                type="text"
                name="owner"
                defaultValue={travel.owner}
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300"
              />
            </div>

            <div>
              <label className="label font-medium">Category</label>
              <input
                type="text"
                name="category"
                defaultValue={travel.category}
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300"
              />
            </div>

            <div>
              <label className="label font-medium">Price Per Day</label>
              <input
                type="number"
                name="pricePerDay"
                defaultValue={travel.pricePerDay}
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300"
              />
            </div>

            <div>
              <label className="label font-medium">Location</label>
              <input
                type="text"
                name="location"
                defaultValue={travel.location}
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300"
              />
            </div>

            <div>
              <label className="label font-medium">Availability</label>
              <select
                name="availability"
                defaultValue={travel.availability}
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300"
              >
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
              </select>
            </div>

            <div>
              <label className="label font-medium">Description</label>
              <textarea
                name="description"
                defaultValue={travel.description}
                required
                className="input w-full rounded-2xl focus:border-0 focus:outline-gray-300 h-24 p-3"
              />
            </div>

            <div>
              <label className="label font-medium">Cover Image URL</label>
              <input
                type="text"
                name="coverImage"
                defaultValue={travel.coverImage}
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300"
              />
            </div>

            <div>
              <label className="label font-medium">Categories</label>
              <input
                type="text"
                name="categories"
                defaultValue={travel.categories}
                required
                className="input w-full rounded-full focus:border-0 focus:outline-gray-300"
              />
            </div>

            <button
              type="submit"
              className="btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
            >
              Update Vehicle
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateVehicle;
