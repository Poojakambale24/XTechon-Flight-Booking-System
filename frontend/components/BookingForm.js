import React, { useState } from "react";

export default function BookingForm({ flight, onBooked }) {
  const [passengerName, setPassengerName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(null);
    try {
      const res = await fetch("http://localhost:4000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ flight_id: flight.id, passenger_name: passengerName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Booking failed");
      setSuccess(data);
      if (onBooked) onBooked(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-4 p-4 border rounded bg-gray-50" onSubmit={handleSubmit}>
      <div className="mb-2 font-bold">Booking for {flight.airline} ({flight.departure_city} → {flight.arrival_city})</div>
      <div className="mb-2">Current Price: <span className="font-semibold text-blue-600">₹{flight.current_price}</span></div>
      <input
        type="text"
        className="border rounded px-3 py-2 w-full mb-2"
        placeholder="Passenger Name"
        value={passengerName}
        onChange={(e) => setPassengerName(e.target.value)}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" disabled={loading}>
        {loading ? "Booking..." : "Confirm Booking"}
      </button>
      {error && (
        <div className="text-red-600 border border-red-200 bg-red-50 p-2 rounded mt-2">
          <span className="font-bold">Error:</span> {error}
        </div>
      )}
      {success && (
        <div className="text-green-600 border border-green-200 bg-green-50 p-2 rounded mt-2">
          <span className="font-bold">Booking successful!</span> PNR: <span className="font-bold">{success.pnr}</span><br />
          <a href={success.pdf_url} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">Download Ticket (PDF)</a>
        </div>
      )}
    </form>
  );
}
