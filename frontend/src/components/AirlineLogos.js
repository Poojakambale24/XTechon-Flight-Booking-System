import React from "react";

import airIndiaLogo from "../assets/airlines/air-india.svg";
import indigoLogo from "../assets/airlines/indigo.svg";
import spicejetLogo from "../assets/airlines/spicejet.png";

export default function AirlineLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-8">
      <img src={indigoLogo} alt="IndiGo" className="h-10 w-auto object-contain" loading="lazy" />
      <img src={airIndiaLogo} alt="Air India" className="h-10 w-auto object-contain" loading="lazy" />
      <img src={spicejetLogo} alt="SpiceJet" className="h-10 w-auto object-contain" loading="lazy" />
    </div>
  );
}
