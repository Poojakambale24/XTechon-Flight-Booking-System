import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useUser } from "../context/UserContext";
import { apiUrl, authHeaders } from "../lib/api";

export default function WalletPage() {
  const { user } = useUser();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWallet() {
      setLoading(true);
      setError("");
      try {
        if (!user?.token) throw new Error("Please login to view wallet");
        const res = await fetch(apiUrl("/api/wallet"), { headers: authHeaders(user) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch wallet balance");
        setBalance(data.wallet_balance ?? 0);
      } catch (err) {
        setError(err.message || "Failed to fetch wallet balance");
      } finally {
        setLoading(false);
      }
    }
    fetchWallet();
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      <div className="flex-1 max-w-md mx-auto w-full px-4 py-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Wallet Balance</h2>
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
          {balance !== null && (
            <div className="text-3xl font-bold text-green-700">₹{Number(balance).toLocaleString()}</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}