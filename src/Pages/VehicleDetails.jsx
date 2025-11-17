import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const VehicleDetails = () => {
  const { id } = useParams();
  const [travel, setTravel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/travel/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTravel(data.result);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!travel) {
    return (
      <div className="text-center mt-10 text-xl text-red-600">
        No vehicle found!
      </div>
    );
  }

  return (
    <div className="max-w-5xl min-h-screen mx-auto p-4 md:p-6 lg:p-8 ">
      <div className="card mt-5 bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={travel.coverImage}
              alt={travel.vehicleName}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {travel.vehicleName}
            </h1>

            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline text-blue-600 border-blue-600 font-medium">
                {travel.category}
              </div>

              {travel.categories && (
                <div className="badge badge-lg badge-outline text-green-600 border-green-600 font-medium">
                  {travel.categories}
                </div>
              )}

              <div className="badge badge-lg badge-outline text-purple-600 border-purple-600 font-medium">
                {travel.availability}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {travel.description}
            </p>

            <div className="space-y-2 text-gray-700">
              <p><strong>Owner:</strong> {travel.owner}</p>
              <p><strong>Location:</strong> {travel.location}</p>
              <p><strong>Price Per Day:</strong> ${travel.pricePerDay}</p>
              <p><strong>Posted On:</strong> {new Date(travel.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-3 mt-6">
              <Link
                to={`/update-vehicles/${travel._id}`}
                className="btn btn-primary rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white border-0 hover:from-pink-600 hover:to-red-700"
              >
                Update Vehicle
              </Link>

              <button className="btn btn-secondary rounded-full">
                Book Now
              </button>

              <button className="btn btn-outline rounded-full border-gray-300 hover:border-pink-500 hover:text-pink-600">
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
