import React from "react";
import { UserProvider, useUser } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

import FlightSearchPage from "./pages/FlightSearchPage";
import WalletPage from "./pages/WalletPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
// Dashboard page will be added next
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";

function ProtectedRoute({ children }) {
  const { user } = useUser();
  const location = useLocation();
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return children;
}

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/flights" element={<ProtectedRoute><FlightSearchPage /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><BookingHistoryPage /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><WalletPage /></ProtectedRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/booking-history" element={<Navigate to="/bookings" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
