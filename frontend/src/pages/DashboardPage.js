import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WalletCard from "../components/WalletCard";
import FlightCard from "../components/FlightCard";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { apiUrl, authHeaders } from "../lib/api";

export default function DashboardPage() {
  const { user } = useUser();
  const userId = useMemo(() => (user?.id ? String(user.id) : ""), [user]);

  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengerName, setPassengerName] = useState("");
  const [wallet, setWallet] = useState(0);
  const [bookingStatus, setBookingStatus] = useState("");
  const [ticketUrl, setTicketUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    async function load() {
      setPageLoading(true);
      setPageError("");
      try {
        if (!user?.token) throw new Error("Please login");
        const [walletRes, flightsRes] = await Promise.all([
          fetch(apiUrl("/api/wallet"), { headers: authHeaders(user) }),
          fetch(apiUrl("/api/flights?sort=price")),
        ]);
        const walletJson = await walletRes.json();
        const flightsJson = await flightsRes.json();
        if (walletRes.ok) setWallet(walletJson.wallet_balance ?? 0);
        if (flightsRes.ok) setFlights(Array.isArray(flightsJson) ? flightsJson : []);
      } catch (err) {
        setPageError(err.message || "Failed to load dashboard data");
      } finally {
        setPageLoading(false);
      }
    }
    load();
  }, [userId, user]);
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      <div className="flex-1 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full px-4 py-8">
        {/* Left: Flight search and listing */}
        <div className="flex-1">
          <div className="text-2xl font-bold text-blue-700 mb-4">Search & Book Flights</div>
          {pageLoading && <div className="text-blue-700">Loading flights...</div>}
          {pageError && <div className="text-red-600">{pageError}</div>}
          {!pageLoading && !pageError && flights.length === 0 && (
            <div className="text-gray-500">No flights found. Seed the database to add flights.</div>
          )}
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} onBook={() => setSelectedFlight(flight)} />
          ))}
        </div>
        {/* Right: Wallet and booking panel */}
        <div className="w-full md:w-80 flex-shrink-0">
          <WalletCard balance={wallet} />
          <div className="bg-white rounded-xl shadow p-6">
            <div className="mb-2 font-semibold text-blue-700">Passenger Name</div>
            <input
              className="border rounded px-4 py-2 w-full mb-4"
              placeholder="Enter passenger name"
              value={passengerName}
              onChange={e => setPassengerName(e.target.value)}
              disabled={loading}
            />
            <div className="mb-2 font-semibold text-blue-700">Selected Flight</div>
            <div className="mb-4">
              {selectedFlight ? (
                <span className="font-mono text-blue-700">{selectedFlight.airline} ({selectedFlight.departure_city}→{selectedFlight.arrival_city}) - ₹{selectedFlight.current_price}</span>
              ) : (
                <span className="text-gray-400">No flight selected</span>
              )}
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-60"
              disabled={!selectedFlight || !passengerName || loading}
              onClick={async () => {
                if (!selectedFlight || !passengerName) return;
                setLoading(true);
                setBookingStatus("");
                setTicketUrl("");
                try {
                  const res = await fetch(apiUrl("/api/bookings"), {
                    method: "POST",
                    headers: { "Content-Type": "application/json", ...authHeaders(user) },
                    body: JSON.stringify({
                      flight_id: selectedFlight.id,
                      passenger_name: passengerName,
                    }),
                  });
                  const data = await res.json();
                  if (res.ok && data.success) {
                    const tUrl = data.pdf_url ? apiUrl(data.pdf_url) : "";
                    setBookingStatus(`Booking successful! PNR: ${data.pnr}`);
                    setTicketUrl(tUrl);
                    if (typeof data.wallet_balance === "number") setWallet(data.wallet_balance);
                    setSelectedFlight(null);
                    setPassengerName("");
                  } else {
                    setBookingStatus(data.error || "Booking failed");
                  }
                } catch (err) {
                  setBookingStatus("Booking failed: " + err.message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
            {bookingStatus && (
              <div className="mt-4 text-center text-sm font-semibold text-blue-700">
                {bookingStatus}
                {ticketUrl && (
                  <div className="mt-2">
                    <a
                      href={ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Download Ticket (PDF)
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Link
              to="/bookings"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
            >
              View Booking History
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
