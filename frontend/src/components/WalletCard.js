import React from "react";

export default function WalletCard({ balance = 50000 }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6 flex flex-col items-center">
      <div className="text-lg font-semibold text-blue-700 mb-2">Wallet Balance</div>
      <div className="text-3xl font-bold text-green-600 mb-2">₹{balance.toLocaleString()}</div>
    </div>
  );
}
