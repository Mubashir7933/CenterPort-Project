import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 animate-pulse">
        Loading services...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Guest Services
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => navigate(`/services/${service.id}`)}
              className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 group-focus:-translate-y-1 hover:scale-105 focus-within:scale-105"
            >
              <div className="p-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mt-3">
                    {service.description}
                  </p>
                </div>

                <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition">
                  {service.message}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
