import React from "react";
import { FiTag, FiLayers, FiUsers, FiBarChart2, FiUmbrella, FiHeadphones } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Services() {
  const services = [
    {
      icon: <FiTag className="text-4xl text-orange-400" />,
      title: "Personalized Matching",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      icon: <FiLayers className="text-4xl text-orange-400" />,
      title: "Wide Variety Of Destinations",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      icon: <FiUsers className="text-4xl text-orange-400" />,
      title: "Highly Qualified Service",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      icon: <FiBarChart2 className="text-4xl text-orange-400" />,
      title: "Handpicked Hotels",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      icon: <FiUmbrella className="text-4xl text-orange-400" />,
      title: "Best Price Guarantee",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    },
    {
      icon: <FiHeadphones className="text-4xl text-orange-400" />,
      title: "24/7 Support",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
  ];

  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, index) => (
          <motion.div
            key={index}
            className="p-8 rounded-xl shadow-sm border hover:shadow-xl transition bg-white"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {item.icon}
            <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
