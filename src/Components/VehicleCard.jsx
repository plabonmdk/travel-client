import React from "react";
import { MapPin, DollarSign, Car } from "lucide-react";
import { motion } from "framer-motion";

const VehicleCard = ({ travel }) => {
  const {
    vehicleName,
    owner,
    category,
    pricePerDay,
    location,
    availability,
    description,
    coverImage,
  } = travel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white shadow-xl rounded-2xl overflow-hidden border hover:shadow-2xl transition-all duration-300 w-full"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={coverImage}
          alt={vehicleName}
          className="w-full h-52 object-cover"
        />

        
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

     
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold text-gray-800">{vehicleName}</h2>

        <p className="text-sm text-gray-600">Owner: {owner}</p>

        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <Car size={16} className="text-blue-600" />
          <span>{category}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700 text-sm">
          <MapPin size={16} className="text-red-500" />
          <span>{location}</span>
        </div>

        <p className="text-sm text-gray-500 leading-snug">{description}</p>

        <div className="flex justify-between items-center pt-3">
          <p className="text-xl font-bold flex items-center gap-1 text-blue-600">
            <DollarSign size={18} />
            {pricePerDay}/Day
          </p>
        </div>

       
        <motion.button
          whileTap={{ scale: 0.95 }}
          className={`w-full px-4 py-2 rounded-lg text-white font-semibold shadow-md transition
            ${
              availability === "Available"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          disabled={availability !== "Available"}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
