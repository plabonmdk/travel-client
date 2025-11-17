import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthenticationContext } from "../contexts/AuthContext";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const { user, logOut } = useContext(AuthenticationContext); 
  const [open, setOpen] = useState(false);

  const navLinks = (
    < >
      <li>
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-vehicles"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }`
          }
        >
          All Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/add-vehicles"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }`
          }
        >
          Add Vehicle
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-vehicles"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }`
          }
        >
          My Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/my-booking"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
            }`
          }
        >
          My Bookings
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-3">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors duration-200">
          TravelEase
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-[17px]">
          {navLinks}
        </ul>

        {/* Right Side Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {user?.email ? (
            <>
              <div className="relative group cursor-pointer">
                <img
                  src={user.photoURL || "https://i.ibb.co/YTbR9Kp/user.png"}
                  className="w-10 h-10 rounded-full border object-cover"
                />
                <span className="absolute top-12 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {user.displayName || "User"}
                </span>
              </div>

              <button
                onClick={logOut}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          open ? "max-h-[600px] py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 text-lg">
          {navLinks}

          {user?.email ? (
            <>
              <div className="flex items-center gap-3 mt-3 mb-2">
                <img
                  src={user.photoURL || "https://i.ibb.co/YTbR9Kp/user.png"}
                  className="w-10 h-10 rounded-full border"
                />
                <p className="font-semibold">{user.displayName || "User"}</p>
              </div>

              <button
                onClick={() => {
                  logOut();
                  setOpen(false);
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 mb-2 hover:bg-red-600 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200"
              >
                Register
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
