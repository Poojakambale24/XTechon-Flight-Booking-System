import React, { useState } from "react";

const cities = [
  "Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Goa", "Pune", "Jaipur"
];

export default function FlightSearch({ onSearch }) {
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const [sort, setSort] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ departure_city: departure, arrival_city: arrival, sort });
  };

  return (
    <form className="flex flex-col md:flex-row gap-4 items-center mb-6" onSubmit={handleSubmit}>
      <select
        className="border rounded px-3 py-2"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        required
      >
        <option value="">Departure City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <select
        className="border rounded px-3 py-2"
        value={arrival}
        onChange={(e) => setArrival(e.target.value)}
        required
      >
        <option value="">Arrival City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
      <select
        className="border rounded px-3 py-2"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="price">Price</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Search</button>
    </form>
  );
}
