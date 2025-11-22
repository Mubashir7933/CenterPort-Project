import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";
import {Button} from "../ui/Button"

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setLoading(true);

    fetch(`${API_BASE_URL}/api/services?lang=${i18n.language}`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err);
        setLoading(false);
      });
  }, [i18n.language]);

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500 animate-pulse">
        {t("app.loading")}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-10">
          {t("app.services")}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() =>
                service.id === 3
                  ? navigate("/tours")
                  : navigate(`/services/${service.id}`)
              }
              className="group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 p-6"
            >
              <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-700 mb-3">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.description}</p>

              <Button
  variant="black"
  className="mt-6"
>
  {service.name === "Tours" ? t("app.viewTours") : t("app.viewDetails")}
</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
