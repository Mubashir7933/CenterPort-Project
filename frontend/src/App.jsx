import { Routes, Route } from "react-router-dom";
import ServicesList from "./components/ServicesList";
import ServiceDetails from "./components/ServiceDetails";


export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        Center Port Hotel
      </h1>
      <Routes>
        <Route path="/" element={<ServicesList />} />  {/* Home page */}
        <Route path="/services/:id" element={<ServiceDetails />} />  {/* Service details page */}
      </Routes>
    </div>
  );
}
