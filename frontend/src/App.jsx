import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import ServicesList from "./components/ServicesList";
import ServiceDetails from "./components/ServiceDetails";
import ToursList from "./components/ToursList";
import RoomCare from "./components/RoomCare";

import LanguageSwitcher from "./components/LanguageSwitcher";
import logo from "./assets/CenterPortHotel.jpg";

export default function App() {
  const { i18n } = useTranslation();

  // 🔥 Auto RTL/LTR switching
  useEffect(() => {
    if (i18n.language === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      {/* Header with Logo + Language Switcher */}
      <div className="flex justify-between items-center max-w-6xl mx-auto px-6 mb-8">
        {/* Logo */}
        <img
          src={logo}
          alt="Center Port Hotel"
          className="h-20 w-auto rounded-lg shadow-md hover:scale-105 transition-transform"
        />

        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ServicesList />} />
        <Route path="/services/1" element={<RoomCare />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/tours" element={<ToursList />} />
      </Routes>

    </div>
  );
}
