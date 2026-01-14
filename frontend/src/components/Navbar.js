import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import logo from "../assets/xtechon-logo.svg";

export default function Navbar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="XTechon" className="h-9 w-auto" />
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/flights" className="text-blue-700 font-medium hover:underline">Search Flights</Link>
        <Link to="/bookings" className="text-blue-700 font-medium hover:underline">My Bookings</Link>
        {user && (
          <Link to="/dashboard" className="text-blue-700 font-medium hover:underline">Dashboard</Link>
        )}
        {user ? (
          <>
            <span className="text-blue-700 font-semibold">{user.email}</span>
            <button
              className="ml-2 px-5 py-2 bg-gray-200 text-blue-700 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
              onClick={() => { logout(); navigate("/login"); }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="ml-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}
