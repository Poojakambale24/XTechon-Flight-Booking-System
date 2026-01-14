import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t mt-16 py-6 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} XTechon – Flight Booking System. All rights reserved.
    </footer>
  );
}
