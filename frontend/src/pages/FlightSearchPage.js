import React, { useEffect, useState } from "react";
import FlightSearch from "../components/FlightSearch";
import BookingForm from "../components/BookingForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiUrl } from "../lib/api";
import { useLocation } from "react-router-dom";

export default function FlightSearchPage() {
	const [flights, setFlights] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [selectedFlight, setSelectedFlight] = useState(null);
	const location = useLocation();

	const handleSearch = async (params) => {
		setLoading(true);
		setError("");
		try {
			const query = Object.entries(params)
				.filter(([_, v]) => v)
				.map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
				.join("&");
			const res = await fetch(apiUrl(`/api/flights?${query}`));
			const data = await res.json();
			if (!res.ok) throw new Error(data?.error || "Failed to fetch flights");
			setFlights(Array.isArray(data) ? data : []);
		} catch (err) {
			setError(err?.message || "Failed to fetch flights");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const sp = new URLSearchParams(location.search);
		const departure_city = sp.get("departure_city") || "";
		const arrival_city = sp.get("arrival_city") || "";
		const sort = sp.get("sort") || "";
		if (departure_city && arrival_city) {
			handleSearch({ departure_city, arrival_city, sort });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location.search]);

	return (
		<div className="min-h-screen flex flex-col bg-blue-50">
			<Navbar />
			<div className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
				<div className="text-2xl font-bold text-blue-700 mb-4">Search Flights</div>
				<FlightSearch onSearch={handleSearch} />
				{loading && <div className="text-blue-600">Loading flights...</div>}
				{error && (
					<div className="text-red-600 border border-red-200 bg-red-50 p-2 rounded mb-4">
						<span className="font-bold">Error:</span> {error}
					</div>
				)}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
					{flights.length === 0 && !loading && !error && (
						<div className="text-gray-500 col-span-3 text-center">No flights found. Try different cities or filters.</div>
					)}
					{flights.map((flight) => (
						<div key={flight.id} className="border rounded-xl p-5 bg-white shadow">
							<div className="font-bold text-lg mb-2 text-blue-700">{flight.airline}</div>
							<div className="mb-1">{flight.departure_city} → {flight.arrival_city}</div>
							<div className="mb-1 text-gray-600">Base Price: ₹{flight.base_price}</div>
							<div className="mb-1 font-semibold text-blue-600 flex items-center">
								Current Price: ₹{flight.current_price}
								{flight.current_price > flight.base_price && (
									<span className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold animate-pulse">Surge</span>
								)}
							</div>
							<button
								className="mt-3 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
								onClick={() => setSelectedFlight(flight)}
							>
								Book
							</button>
						</div>
					))}
				</div>
				{selectedFlight && (
					<div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
						<div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full relative">
							<button
								className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
								onClick={() => setSelectedFlight(null)}
							>
								×
							</button>
							<BookingForm flight={selectedFlight} onBooked={() => setSelectedFlight(null)} />
						</div>
					</div>
				)}
			</div>
			<Footer />
		</div>
	);
}