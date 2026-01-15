import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import AirlineLogos from "../components/AirlineLogos";
import FlightSearchBox from "../components/FlightSearchBox";
import airplaneImg from "../assets/airplane-hero.jpg";
import airplaneFallback from "../assets/airplane-hero-fallback.svg";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navbar />
      {/* Hero Section */}
      <div className="relative w-full h-[350px] md:h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src={airplaneImg}
          alt="Airplane Hero"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
          onError={(e) => {
            e.currentTarget.src = airplaneFallback;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        <div className="relative z-10 text-center text-white drop-shadow-xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Book Your Next Flight with XTechon</h1>
          <p className="text-lg md:text-2xl mb-8 font-medium">Modern. Fast. Reliable. Airline-grade booking for everyone.</p>
        </div>
      </div>
      {/* Flight Search Box overlays hero */}
      <div className="relative z-20 -mt-16 mb-8">
        <FlightSearchBox
          onSearch={({ from, to }) => {
            const query = new URLSearchParams({
              departure_city: from,
              arrival_city: to,
            });
            navigate(`/flights?${query.toString()}`);
          }}
        />
      </div>
      {/* How it works */}
      <div className="max-w-6xl mx-auto w-full px-4">
        <HowItWorks />
      </div>
      {/* Airline Logos */}
      <div className="max-w-6xl mx-auto w-full px-4">
        <h3 className="text-lg font-semibold text-blue-700 text-center mt-12 mb-4">Trusted by India’s top airlines</h3>
        <AirlineLogos />
      </div>
      <Footer />
    </div>
  );
}
