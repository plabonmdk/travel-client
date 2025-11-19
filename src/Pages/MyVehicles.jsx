import React, { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../contexts/AuthContext";
import VehicleCard from "../Components/VehicleCard";
import Loading from "../Components/Loading";
import { div } from "framer-motion/client";

const MyVehicles = () => {
  const { user } = useContext(AuthenticationContext);

  const [travel, setTravel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://travel-server-roan.vercel.app/my-vehicles?email=${user.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTravel(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading) {
    return (
      <span className="flex justify-center items-center min-h-[60vh]">
        <Loading></Loading>
      </span>
    );
  }

  if (travel.length === 0) {
    return <h1>No vehicles found</h1>;
  }

  return (
    <div className="p-4 ">
      <div className="max-w-7xl mt-15 mx-auto grid   grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {travel.result.map((travel) => (
          <VehicleCard key={travel._id} travel={travel} />
        ))}
      </div>
    </div>
  );
};

export default MyVehicles;
