import { Routes, Route } from "react-router-dom";
import ServicesList from "./components/ServicesList";
import ServiceDetails from "./components/ServiceDetails";
import ToursList from "./components/ToursList";
import RoomCare from "./components/RoomCare"
import logo from "./assets/CenterPortHotel.jpg";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
        {/* Logo Header */}
        <div className="flex justify-center mb-8">
        <img
          src={logo}
          alt="Center Port Hotel"
          className="h-24 w-auto rounded-lg shadow-md hover:scale-105 transition-transform"
        />
      </div>
      <Routes>
        <Route path="/" element={<ServicesList />} />  {/* Home page */}
        <Route path = "/services/1" element={<RoomCare/>}/>
        <Route path="/services/:id" element={<ServiceDetails />} />  {/* Service details page */}
        <Route path="/tours" element={<ToursList/>}/>
      </Routes>
    </div>
  );
}
