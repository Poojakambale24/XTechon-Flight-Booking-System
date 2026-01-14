import React, { useEffect, useState } from "react";
import BookingTable from "../components/BookingTable";
import { useUser } from "../context/UserContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiUrl, authHeaders } from "../lib/api";

export default function BookingHistoryPage() {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      setError("");
      try {
        if (!user?.token) throw new Error("Please login to view bookings");
        const res = await fetch(apiUrl("/api/bookings"), { headers: authHeaders(user) });
        const data = await res.json();
        // Transform backend data to BookingTable format
        setBookings(
          data.map((b) => ({
            pnr: b.pnr,
            flight: b.flight ? `${b.flight.airline} (${b.flight.departure_city}→${b.flight.arrival_city})` : "-",
            date: new Date(b.booking_time).toLocaleString(),
            amount: b.final_price,
            pdf_url: b.pdf_url ? apiUrl(b.pdf_url) : "#",
          }))
        );
      } catch (err) {
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      <div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Booking History</h2>
        {loading && (
          <div className="flex items-center text-blue-600 mb-4">
            <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
            Loading...
          </div>
        )}
        {error && (
          <div className="text-red-600 border border-red-200 bg-red-50 p-2 rounded mb-4">
            <span className="font-bold">Error:</span> {error}
          </div>
        )}
        <BookingTable bookings={bookings} />
      </div>
      <Footer />
    </div>
  );
}