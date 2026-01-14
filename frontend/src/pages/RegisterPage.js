import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <RegisterForm onRegister={() => setTimeout(() => navigate("/login"), 1200)} />
      </div>
      <Footer />
    </div>
  );
}
