import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const from = location.state?.from?.pathname || "/dashboard";
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <LoginForm onLogin={(userData) => {
          login(userData);
          navigate(from, { replace: true });
        }}/>
      </div>
      <Footer />
    </div>
  );
}
