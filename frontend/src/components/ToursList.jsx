import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ToursList() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/services/3/tours")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch tours:", err);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 animate-pulse">
        Loading tours...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-6 hover:underline"
        >
          ← Back to Services
        </button>

        <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
          Available Tours
        </h1>

        <div className="space-y-6">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="border rounded-2xl shadow-sm p-6 bg-white"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {tour.name}
              </h2>
              <p className="text-gray-600 mb-4">{tour.description}</p>

              {tour.image && (
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="rounded-lg mb-4 w-full"
                />
              )}

              {tour.pdf && (
                <a
                  href={tour.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline block mb-4"
                >
                  📄 View Brochure
                </a>
              )}

              <a
                href={`https://wa.me/1234567890?text=${encodeURIComponent(
                  tour.message
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full inline-block"
              >
                💬 Contact on WhatsApp
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
