import React from "react";

export default function BookingTable({ bookings = [] }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-6">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-blue-50">
            <th className="px-4 py-2 text-left font-semibold text-blue-700">PNR</th>
            <th className="px-4 py-2 text-left font-semibold text-blue-700">Flight</th>
            <th className="px-4 py-2 text-left font-semibold text-blue-700">Date</th>
            <th className="px-4 py-2 text-left font-semibold text-blue-700">Amount Paid</th>
            <th className="px-4 py-2 text-left font-semibold text-blue-700">Ticket</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-400 py-8">No bookings found.</td>
            </tr>
          ) : (
            bookings.map((b) => (
              <tr key={b.pnr} className="border-b last:border-0">
                <td className="px-4 py-2 font-mono text-blue-700">{b.pnr}</td>
                <td className="px-4 py-2">{b.flight}</td>
                <td className="px-4 py-2">{b.date}</td>
                <td className="px-4 py-2">₹{b.amount.toLocaleString()}</td>
                <td className="px-4 py-2">
                  <a href={b.pdf_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Download</a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
