import React from "react";
import { MapPin, DollarSign, Car } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";



const VehicleCard = ({ travel }) => {
  const {
    _id,
    vehicleName,
    owner,
    category,
    pricePerDay,
    location,
    availability,
    description,
    coverImage,
    userEmail

  } = travel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white mt-25 shadow-xl rounded-2xl overflow-hidden border hover:shadow-2xl transition-all duration-300 w-full"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={coverImage}
          alt={vehicleName}
          className="w-full h-52 object-cover"
        />

        {/* Availability Badge */}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
            availability === "Available"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {availability}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-gray-800">{vehicleName}</h2>

        <p className="text-sm text-gray-600">Owner: {owner}</p>

        <h1 className="text-sm text-gray-600">{userEmail}</h1>

        {/* Category */}
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <Car size={16} className="text-blue-600" />
          <span>{category}</span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <MapPin size={16} className="text-red-500" />
          <span>{location}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-snug line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <div className="flex justify-between items-center pt-3">
          <p className="text-xl font-bold flex items-center gap-1 text-blue-600">
            <DollarSign size={18} /> {pricePerDay}/Day
          </p>
        </div>

        {/* BUTTON */}
        <motion.div whileTap={{ scale: 0.95 }}>
          <Link to={`/vehicle-details/${_id}`}>
            <button
              className={`w-full px-4 py-2 rounded-lg text-white font-semibold shadow-md transition duration-300 ${
                availability === "Available"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={availability !== "Available"}
            >
              View Details
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
