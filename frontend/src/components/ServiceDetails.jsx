import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error("Failed to load service:", err));
  }, [id]);

  if (!service)
    return <div className="text-center mt-20 text-gray-500">UnderWorking...</div>;

  return (
    <div className="min-h-screen bg-white p-8">
      <button
        onClick={() => navigate(-1)}
        className="text-blue-600 mb-6 hover:underline"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">{service.name}</h1>
      <p className="text-gray-600">{service.description}</p>
    </div>
  );
}
