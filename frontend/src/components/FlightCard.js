import React from "react";

export default function FlightCard({ flight, onBook }) {
  const airlineName = flight?.airline || "Unknown Airline";
  const departure = flight?.departure_city || "-";
  const arrival = flight?.arrival_city || "-";
  const price = typeof flight?.current_price === "number" ? flight.current_price : 0;
  const time = flight?.time || "-";
  const logoUrl = flight?.airlineLogo;

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-2 mb-6">
      <div className="flex items-center gap-3 mb-2">
        {logoUrl ? (
          <img src={logoUrl} alt={airlineName} className="h-8 w-8 object-contain" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            {airlineName.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="font-bold text-lg text-blue-700">{airlineName}</div>
        <span className="ml-auto text-xs text-gray-400">ID: {flight?.id ?? "-"}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <span>{departure}</span>
        <span className="mx-1">→</span>
        <span>{arrival}</span>
        <span className="ml-auto font-semibold">₹{price.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Time: {time}</span>
        {flight?.surge && (
          <span className="ml-2 px-2 py-1 bg-red-100 text-red-600 rounded text-xs font-bold animate-pulse">Surge</span>
        )}
      </div>
      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
        onClick={() => onBook?.(flight)}
      >
        Book Now
      </button>
    </div>
  );
}
