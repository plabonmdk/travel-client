import React from 'react';
import errorImage from '../assets/internet-net(1).jpg'; 

const Error = () => {
    return (
        <div className="flex flex-col w-7xl mx-auto items-center justify-center min-h-screen bg-gray-100">
            <img src={errorImage} alt="Error" className="w-200 h-150 mb-6" />
            <h1 className="text-3xl font-bold text-red-600 mb-2">Oops! Something went wrong.</h1>
            <p className="text-gray-700">We couldn't find the page you were looking for.</p>
        </div>
    );
};

export default Error;
