import React, { useState } from "react";
import { apiUrl } from "../lib/api";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      onLogin?.(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto mt-16">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Login to XTechon</h2>
      <div className="mb-4">
        <input
          type="email"
          className="border border-blue-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          className="border border-blue-200 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between mb-6">
        <label className="flex items-center text-sm">
          <input
            type="checkbox"
            className="mr-2 accent-blue-600"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          Remember me
        </label>
        <button type="button" className="text-blue-600 hover:underline text-sm">Forgot password?</button>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <div className="text-red-600 mt-4 text-center">{error}</div>}
      <div className="mt-6 text-center text-sm text-gray-500">
        New to XTechon? <a href="/register" className="text-blue-600 hover:underline">Create an account</a>
      </div>
    </form>
  );
}
