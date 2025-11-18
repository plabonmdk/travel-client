import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TeamPage() {
  const [team, setTeam] = useState([]);

  const teamData = [
    { name: 'Jonathan Doe', role: 'Taxi Driver & Traveler', img: 'https://i.pravatar.cc/300?img=1', desc: 'I\'d like to send you a sincere "thank you" for all of your assistance during my recent trip.' },
    { name: 'Jessica Jui', role: 'Taxi Driver & Traveler', img: 'https://i.pravatar.cc/300?img=2', desc: 'I\'d like to send you a sincere "thank you" for all of your assistance during my recent trip.' },
    { name: 'Monalisa Lui', role: 'Taxi Driver & Traveler', img: 'https://i.pravatar.cc/300?img=3', desc: 'I\'d like to send you a sincere "thank you" for all of your assistance during my recent trip.' },
    { name: 'David Park', role: 'Taxi Driver & Traveler', img: 'https://i.pravatar.cc/300?img=4', desc: 'I\'d like to send you a sincere "thank you" for all of your assistance during my recent trip.' },
    { name: 'Emily Rose', role: 'Taxi Driver & Traveler', img: 'https://i.pravatar.cc/300?img=5', desc: 'I\'d like to send you a sincere "thank you" for all of your assistance during my recent trip.' },
    { name: 'Michael Stan', role: 'Taxi Driver & Traveler', img: 'https://i.pravatar.cc/300?img=6', desc: 'I\'d like to send you a sincere "thank you" for all of your assistance during my recent trip.' },
    { name: 'Sophia Lin', role: 'Taxi Driver & Traveler', img: 'https://i.pravatar.cc/300?img=7', desc: 'I\'d like to send you a sincere "thank you" for all of your assistance during my recent trip.' },
    { name: 'Chris Nolan', role: 'Taxi Driver & Traveler', img: 'https://i.pravatar.cc/300?img=8', desc: 'I\'d like to send you a sincere "thank you" for all of your assistance during my recent trip.' },
  ];

  useEffect(() => {
    setTeam([...teamData, ...teamData]); 
  }, []);

  return (
    <div className="p-10 text-center overflow-hidden">
      
      
      <motion.div
        className="flex gap-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 20,
          repeat: Infinity,
        }}
      >
        {team.map((t, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="min-w-[250px] bg-white p-5 rounded-2xl shadow-md hover:shadow-xl duration-300"
          >
            <motion.img
              src={t.img}
              alt={t.name}
              className="w-32 h-32 rounded-full mx-auto object-cover"
              whileHover={{ scale: 1.1 }}
            />
            <h3 className="text-xl font-semibold mt-4">{t.name}</h3>
            <p className="text-gray-500">{t.role}</p>
            <p className="text-sm text-gray-600 mt-2">{t.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
