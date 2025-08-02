import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <nav className="fixed top-0 left-0 w-full z-50  bg-black backdrop-blur-sm border-b border-white/10 px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <Link
        to="/"
        className={` w-full  font-semibold text-white ${
          user ? "text-center text-2xl" : " text-start text-xl"
        } tracking-tight`}
      >
        <span className="text-lime-400">Random</span>Stuff
      </Link>

      {!user && (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-lime-400 border border-lime-400 rounded-md hover:bg-lime-400 hover:text-black transition-all duration-300 group"
          >
            <span className="absolute inset-0 transform scale-0 group-hover:scale-100 bg-lime-400 opacity-10 rounded-md transition-transform duration-300"></span>
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
