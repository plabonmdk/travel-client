import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ForgotPassword from "../Pages/ForgotPassword";
import AddVehicles from "../Pages/AddVehicles";
import AllVehicles from "../Pages/AllVehicles";
import UpdateVehicle from "../Pages/UpdateVehicle";
import VehicleDetails from "../Pages/VehicleDetails";
import MyBookings from "../Pages/MyBookings";
import MyVehicles from "../Pages/MyVehicles";
import NotFound from "../Pages/NotFound";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                index:true, 
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: "add-vehicles",
                element: <AddVehicles></AddVehicles>
            },
            {
                path: "all-vehicles",
                element: <AllVehicles></AllVehicles>,
                loader: () => fetch("http://localhost:3000/travel")
            },
            {
                path: "update-vehicles",
                element: <UpdateVehicle></UpdateVehicle>
            },
            {
                path: "vehicle-details",
                element: <VehicleDetails></VehicleDetails>
            },
            {
                path: "my-booking",
                element: <MyBookings></MyBookings>
            },
            {
                path: "my-vehicles",
                element: <MyVehicles></MyVehicles>
            },
            {
                path: "not-found",
                element: <NotFound></NotFound>
            },
            
        ]
    }
])