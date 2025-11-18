import React from 'react';
import HeroSection from '../Components/HeroSection';
import { useLoaderData } from 'react-router';
import VehicleCard from '../Components/VehicleCard';
import TeamPage from './TeamPage';
import Services from '../Pages/Services';
import TravelExperts from '../Pages/TravelExperts';


const  Home = () => {

    const data = useLoaderData()

    console.log(data)

    return (
        <div>

            <div><HeroSection></HeroSection></div>

            <div className="max-w-7xl mx-auto grid mt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {
                    data.result.map(travel => <VehicleCard key={travel._id} travel={travel}></VehicleCard>)
                }
            </div>



            <div className='max-w-7xl mx-auto'>
                <TravelExperts></TravelExperts>
            </div>
            <div className='max-w-7xl mx-auto'>
                <Services></Services>
            </div>
            <div className='max-w-7xl mx-auto'>
                <TeamPage></TeamPage>
            </div>
            
            
        </div>
    );
};

export default Home;