import React, { useContext, useEffect, useState } from 'react';
import { AuthenticationContext } from '../contexts/AuthContext';
import VehicleCard from '../Components/VehicleCard';

const MyVehicles = () => {
    const { user } = useContext(AuthenticationContext);
    console.log(user)
    const [travel, setTravel] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) { 
            fetch(`http://localhost:3000/my-vehicles?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setTravel(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [user?.email]);

    if (loading) {
        return <h1>Loading .......</h1>;
    }

    if (travel.length === 0) {
        return <h1>No vehicles found</h1>;
    }

    return (
        <div className="p-4">
            <div className="grid mt-15 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {travel.result.map((travel) => (
                    <VehicleCard key={travel._id} travel={travel} />
                ))}
            </div>
        </div>
    );
};

export default MyVehicles;
