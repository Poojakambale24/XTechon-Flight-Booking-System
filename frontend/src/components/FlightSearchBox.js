import React, { useState } from "react";

const cities = [
  "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Goa", "Pune", "Jaipur"
];

export default function FlightSearchBox({ onSearch }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (from && to && from !== to) {
      onSearch?.({ from, to });
    }
  };

  return (
    <form
      className="flex flex-col md:flex-row items-center gap-4 bg-white bg-opacity-90 rounded-xl shadow-lg p-6 max-w-2xl mx-auto -mt-24 relative z-10"
      onSubmit={handleSubmit}
    >
      <select
        className="border rounded px-4 py-2 w-48"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        required
      >
        <option value="">From</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <select
        className="border rounded px-4 py-2 w-48"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        required
      >
        <option value="">To</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
      >
        Search Flights
      </button>
    </form>
  );
}
