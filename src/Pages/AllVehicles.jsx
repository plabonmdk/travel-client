import React, { useState } from "react";
import { useLoaderData } from "react-router";
import VehicleCard from "../Components/VehicleCard";
import Error from "../Pages/Error";
import Loading from "../Components/Loading";

const AllVehicles = () => {
  const loaderData = useLoaderData();
  const [models, setModels] = useState(loaderData);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;

    setLoading(true);

    fetch(`https://travel-server-roan.vercel.app/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
        setModels(data.result || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mt-5 mb-10">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
          All Vehicles
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Explore best ride with{" "}
          <span className="font-semibold text-blue-600">TravelEase</span>
        </p>

        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex justify-center gap-2 mb-8">
        <label className="input rounded-full flex items-center gap-2 px-3">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>

          <input type="search" name="search" placeholder="Search" />
        </label>

        <button className="btn btn-secondary rounded-full">Search</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {models.length === 0 ? (
          <Error />
        ) : (
          models.map((travel) => (
            <VehicleCard key={travel._id} travel={travel} />
          ))
        )}
      </div>
    </div>
  );
};

export default AllVehicles;
