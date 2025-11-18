import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthenticationContext } from "../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom"; // react-router-dom correct import

const Navbar = () => {
  const { user, signOutUserFunc } = useContext(AuthenticationContext);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUserFunc();
      console.log("Logged out successfully");
      setOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          onClick={() => setOpen(false)}
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
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
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
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
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
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
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
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
              isActive
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
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
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700"
        >
          TravelEase
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-[17px]">
          {navLinks}
        </ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {user?.email ? (
            <>
              {/* Profile Hover */}
              <div className="relative group cursor-pointer">
                <img
                  src={user.photoURL || "https://i.ibb.co/YTbR9Kp/user.png"}
                  className="w-10 h-10 rounded-full border object-cover"
                />
                <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white shadow-md border rounded-lg px-4 py-4
                  opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 w-40 text-center">
                  <img
                    src={user.photoURL || "https://i.ibb.co/YTbR9Kp/user.png"}
                    alt="Profile"
                    className="w-14 h-14 rounded-full border mx-auto mb-2 object-cover"
                  />
                  <p className="font-semibold text-gray-800 mb-1">
                    {user.displayName || user.email}
                  </p>
                  <Link
                    to="/profile"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-lg transition-all duration-300 overflow-hidden ${
          open ? "max-h-[600px] py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 text-lg">
          {navLinks}

          {user?.email ? (
            <>
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center gap-2 mt-3"
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/YTbR9Kp/user.png"}
                  className="w-14 h-14 rounded-full border object-cover"
                />
                <p className="font-semibold">{user.displayName || user.email}</p>
                <span className="text-blue-600 text-sm hover:underline">View Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg"
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
