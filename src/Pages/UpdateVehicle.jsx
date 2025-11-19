import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../contexts/AuthContext";
import Loading from "../Components/Loading";

const fieldConfig = [
  { name: "vehicleName", label: "Vehicle Name", type: "text" },
  { name: "owner", label: "Owner", type: "text" },
  { name: "category", label: "Category", type: "text" },
  { name: "pricePerDay", label: "Price Per Day", type: "number" },
  { name: "location", label: "Location", type: "text" },
  { name: "availability", label: "Availability", type: "select", options: ["Available", "Booked"] },
  { name: "description", label: "Description", type: "textarea" },
  { name: "coverImage", label: "Cover Image URL", type: "text" },
  { name: "categories", label: "Categories", type: "text" },
];

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthenticationContext);
  const [travel, setTravel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchVehicle = async () => {
      try {
        const res = await fetch(`http://localhost:3000/travel/${id}`, {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        });

        const data = await res.json();
        setTravel(data.result);
      } catch (err) {
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

    const formData = {};
    fieldConfig.forEach((field) => {
      let value = e.target[field.name].value;
      if (field.type === "number") value = Number(value);
      formData[field.name] = value;
    });

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
          title: "Updated Successfully!",
          text: "Vehicle updated successfully!",
          timer: 1500,
          showConfirmButton: false,
        });

      
        setTimeout(() => {
          navigate(`/vehicle-details/${id}`);
        }, 1500);

      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Failed to update.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
      });
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10">
        <Loading />
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12">
      <div className="card bg-white w-full max-w-lg shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Update Vehicle</h2>

        {travel && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {fieldConfig.map((field) => (
              <div key={field.name}>
                <label className="label font-medium">{field.label}</label>

                {field.type === "textarea" ? (
                  <textarea
                    name={field.name}
                    defaultValue={travel[field.name]}
                    required
                    className="input w-full rounded-2xl h-24 p-3"
                  />
                ) : field.type === "select" ? (
                  <select
                    name={field.name}
                    defaultValue={travel[field.name]}
                    className="input w-full rounded-full"
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    defaultValue={travel[field.name]}
                    required
                    className="input w-full rounded-full"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="btn w-full text-white mt-6 rounded-full bg-gradient-to-r from-pink-500 to-red-600"
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
