import React from "react";
import { useLoaderData } from "react-router";
import VehicleCard from "../Components/VehicleCard";

const AllVehicles = () => {
  const data = useLoaderData();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mt-5 mb-10">
        <h1 className="text-4xl font-bold text-gray-800 tracking-wide">
          All Vehicles
        </h1>
        <p className="text-lg text-gray-500 mt-2">
          Explore best ride with <span className="font-semibold text-blue-600">TravelEase</span>
        </p>

        <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* Vehicle Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((travel) => (
          <VehicleCard key={travel._id} travel={travel} />
        ))}
      </div>
    </div>
  );
};

export default AllVehicles;
