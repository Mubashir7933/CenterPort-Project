import { useEffect, useState } from "react";

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading services...</div>;

  return (


<>

    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Guest Services</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {services.map((service) => (
          <div
          key={service.id}
          className="p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold text-gray-800">{service.name}</h3>
            <p className="text-gray-600 mt-2">{service.description}</p>
            <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
              {service.message}
            </button>
          </div>
        ))}
      </div>
    </div>
        </>    
  );
}
