import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

import VehicleCard from '../Components/VehicleCard';
import Loading from '../Components/Loading';

const MyBookings = () => {
  const { user } = useContext(AuthenticationContext);
  // console.log(user)
  const [travel, setTravel] = useState([]);
  // console.log(travel)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch(`http://localhost:3000/my-booking?email=${user.email}`, {
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        setTravel(data.result);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch vehicle data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <span className="flex  justify-center items-center min-h-[60vh]"><Loading></Loading></span>;

  return (
    <div>
      <div className="max-w-7xl mx-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3">
        {travel.map((travel) => (
          <VehicleCard  key={travel._id} travel={travel} />
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
