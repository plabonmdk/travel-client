import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthenticationContext } from "../contexts/AuthContext";

const VehicleDetails = () => {
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
            authorization: `Bearer ${user.accessToken}`,
          },
        });
        const data = await res.json();
        setTravel(data.result);
      } catch (err) {
        console.error("Failed to fetch vehicle:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicle();
  }, [id, user]);

  const handleBooking = async () => {
    if (!user) {
      Swal.fire("Error", "You must be logged in to book a vehicle", "error");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/booking/${travel._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...travel, userEmail: user.email }),
      });

      const data = await res.json();
console.log(data)
      if (data.success) {
        Swal.fire("Success", "Booking completed successfully!", "success");
        navigate("/my-booking");
      } else {
        Swal.fire("Error", "Booking failed. Please try again.", "error");
      }
    } catch (err) {
      console.error("Booking failed:", err.massage);
      Swal.fire("Error", "Booking failed. Please try again.", "error");
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/travel/${id}`, {
            method: "DELETE",
          });
          const data = await res.json();
          if (data.success) {
            Swal.fire("Deleted!", "The vehicle has been deleted.", "success");
            navigate("/all-vehicles");
          } else {
            Swal.fire("Error!", "Something went wrong. Please try again.", "error");
          }
        } catch (err) {
          console.error("Delete failed:", err);
          Swal.fire("Error!", "Something went wrong. Please try again.", "error");
        }
      }
    });
  };

  if (loading) return <div className="text-center mt-10 text-xl font-semibold">Loading...</div>;
  if (!travel) return <div className="text-center text-xl text-red-600">No vehicle found!</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 mt-10 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={travel.coverImage || ""}
              alt={travel.vehicleName || "Vehicle"}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{travel.vehicleName}</h1>

            <div className="flex flex-wrap gap-3">
              {travel.category && (
                <div className="badge badge-lg badge-outline text-blue-600 border-blue-600 font-medium">
                  {travel.category}
                </div>
              )}
              {travel.availability && (
                <div className="badge badge-lg badge-outline text-purple-600 border-purple-600 font-medium">
                  {travel.availability}
                </div>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">{travel.description}</p>

            <div className="space-y-2 text-gray-700">
              <p><strong>Owner:</strong> {travel.owner}</p>
              <p><strong>Location:</strong> {travel.location}</p>
              <p><strong>Price Per Day:</strong> ${travel.pricePerDay}</p>
              <p><strong>Posted On:</strong> {travel.createdAt ? new Date(travel.createdAt).toLocaleDateString() : "N/A"}</p>
            </div>

            <div className="flex gap-3 mt-6">
              <Link
                to={`/update-vehicles/${travel._id}`}
                className="btn btn-primary rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white border-0 hover:from-pink-600 hover:to-red-700"
              >
                Update Vehicle
              </Link>

              <button onClick={handleBooking} className="btn btn-secondary rounded-full">
                Book Now
              </button>

              <button onClick={handleDelete} className="btn btn-outline rounded-full border-gray-300 hover:border-pink-500 hover:text-pink-600">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;
