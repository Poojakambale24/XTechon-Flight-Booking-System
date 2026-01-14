import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      title: "Search Flights",
      desc: "Find the best flights between your cities with real-time pricing.",
      icon: (
        <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
      ),
    },
    {
      title: "Book Ticket",
      desc: "Book your ticket instantly and securely with a few clicks.",
      icon: (
        <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ),
    },
    {
      title: "Manage Bookings",
      desc: "View, download, or manage all your bookings in one place.",
      icon: (
        <svg className="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h10a4 4 0 004-4v-5a4 4 0 00-4-4z" /></svg>
      ),
    },
  ];
  return (
    <section className="py-12 bg-blue-50 rounded-xl mt-12">
      <h2 className="text-2xl font-bold text-center mb-8 text-blue-700">How it works</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center bg-white rounded-lg shadow p-6 w-64">
            {step.icon}
            <div className="text-lg font-semibold mb-2 text-blue-700">{step.title}</div>
            <div className="text-gray-600 text-center">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
