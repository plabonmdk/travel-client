import React, { useContext } from 'react';
import { AuthenticationContext } from '../contexts/AuthContext'; 
import { Navigate, useLocation } from 'react-router-dom'; 
import Loading from './Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthenticationContext);
  const location = useLocation();


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

 
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  return children;
};

export default PrivateRoute;
