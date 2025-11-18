import { useContext, useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthenticationContext } from "../contexts/AuthContext";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";

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

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-500"
    }`;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-vehicles" onClick={() => setOpen(false)} className={linkClass}>
          All Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-vehicles" onClick={() => setOpen(false)} className={linkClass}>
          Add Vehicle
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-vehicles" onClick={() => setOpen(false)} className={linkClass}>
          My Vehicles
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-booking" onClick={() => setOpen(false)} className={linkClass}>
          My Bookings
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img className="w-12 h-12 object-cover rounded-full" src={logo} alt="Logo" />
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            TravelEase
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-[17px]">{navLinks}</ul>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4">
          {user?.email ? (
            <>
              {/* Profile Hover */}
              <div className="relative group cursor-pointer">
                <img
                  src={user.photoURL || "https://i.ibb.co/YTbR9Kp/user.png"}
                  className="w-10 h-10 rounded-full border object-cover transition-transform duration-200 group-hover:scale-110"
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-12 left-1/2 -translate-x-1/2 bg-white shadow-lg border rounded-lg px-4 py-4 z-50 w-44 text-center opacity-0 group-hover:opacity-100"
                >
                  <img
                    src={user.photoURL || "https://i.ibb.co/YTbR9Kp/user.png"}
                    alt="Profile"
                    className="w-14 h-14 rounded-full border mx-auto mb-2 object-cover"
                  />
                  <p className="font-semibold text-gray-800 mb-1 truncate">
                    {user.displayName || user.email}
                  </p>
                  <Link to="/profile" className="text-blue-600 hover:underline text-sm">
                    View Profile
                  </Link>
                </motion.div>
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
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700 hover:text-blue-500 transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-4 text-lg">
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
                    <p className="font-semibold truncate">{user.displayName || user.email}</p>
                    <span className="text-blue-600 text-sm hover:underline">View Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg mt-2 w-full hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full text-center hover:bg-blue-600 transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg w-full text-center mt-2 hover:bg-blue-500 hover:text-white transition"
                  >
                    Register
                  </Link>
                </>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
