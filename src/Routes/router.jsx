import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";
import AddVehicles from "../Pages/AddVehicles";
import AllVehicles from "../Pages/AllVehicles";

import MyBookings from "../Pages/MyBookings";
import MyVehicles from "../Pages/MyVehicles";

import VehicleDetails from "../Pages/VehicleDetails";
import UpdateVehicle from "../Pages/UpdateVehicle";
import Profile from "../Pages/Profile";
import Error from "../Pages/Error";
import PrivateRoute from "../Components/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Error></Error>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        loader: () =>
          fetch("https://travel-server-roan.vercel.app/latest-travel"),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "add-vehicles",
        element: (
          <PrivateRoute>
            <AddVehicles></AddVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: "all-vehicles",
        element: <AllVehicles></AllVehicles>,
        loader: () => fetch("https://travel-server-roan.vercel.app/travel"),
      },
      {
        path: "update-vehicles/:id",
        element: (
          <PrivateRoute>
            <UpdateVehicle></UpdateVehicle>
          </PrivateRoute>
        ),
      },
      {
        path: "vehicle-details/:id",
        element: (
          <PrivateRoute>
            <VehicleDetails></VehicleDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "my-booking",
        element: (
          <PrivateRoute>
            <MyBookings></MyBookings>
          </PrivateRoute>
        ),
      },
      {
        path: "my-vehicles",
        element: (
          <PrivateRoute>
            <MyVehicles></MyVehicles>
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: <Profile></Profile>,
      },
    ],
  },
]);
