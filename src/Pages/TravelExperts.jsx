import React from 'react';
import { motion } from 'framer-motion';
import about from "../assets/about.webp";

const TravelExperts = () => {
  return (
    <div className="p-8">
      <motion.h1 
        className="text-3xl text-center my-2 font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Who we are?
      </motion.h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <motion.div 
          className="md:w-1/2 h-full"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img 
            src={about} 
            alt="Travel Experts" 
            className="rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-2xl font-semibold mb-4">We are Travel Experts</h2>
          <p className="mb-6 text-gray-700">
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelExperts;
