import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services/${id}?lang=${i18n.language}`)
      .then((res) => res.json())
      .then((data) => setService(data))
      .catch((err) => console.error("Failed to load service:", err));
  }, [id, i18n.language]);

  if (!service)
    return (
      <div className="text-center mt-20 text-gray-500">
        {t("details.loading")}
      </div>
    );

  // WhatsApp message (translated)
  const whatsappMessage = t("details.whatsappMessage", {
    service: service.name,
  });

  const whatsappUrl = `https://wa.me/+905334667667?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div
      className={`min-h-screen bg-gray-50 flex justify-center items-start py-16 px-6 ${
        i18n.language === "ar" ? "rtl" : ""
      }`}
    >
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-6 hover:underline"
        >
          ← {t("details.back")}
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          {service.name}
        </h1>

        {/* Optional Image */}
        {service.image && (
          <img
            src={service.image}
            alt={service.name}
            className="my-6 w-full rounded-lg object-cover shadow-sm"
          />
        )}

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-8">
          {service.description}
        </p>

          {/* ---------- Airport Transfers Section ---------- */}
          {service.transfers && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              {t("details.transferOptions")}
            </h2>

            <div className="space-y-4">
              {service.transfers.map((tItem) => (
                <div
                  key={tItem.id}
                  className="border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center"
                >
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {tItem.vehicle}
                    </h3>
                    <p className="text-gray-600 text-sm">{tItem.route}</p>
                  </div>

                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <span className="text-blue-700 font-semibold text-lg">
                      {tItem.price}
                    </span>

                    <a
                      href={`https://wa.me/+905334667667?text=${encodeURIComponent(
                        tItem.message
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full"
                    >
                      💬 {t("details.bookNow")}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------- Laundry Section ---------- */}
        {service.details && (
          <div className="space-y-8">

            {/* Pricing */}
            <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl">
              <h2 className="text-2xl font-semibold text-blue-700 mb-3">
                {t("details.pricing")}
              </h2>
              <p className="text-gray-700 text-lg">
                <strong>
                  {service.details.pricing.base_rate_per_kg}{" "}
                  {service.details.pricing.currency}
                </strong>{" "}
                {t("details.perKg")}
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {service.details.pricing.notes}
              </p>
            </div>

            {/* Delivery Options */}
            <div className="bg-green-50 border border-green-100 p-5 rounded-xl">
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                {t("details.deliveryOptions")}
              </h2>

              {service.details.delivery_options?.map((option, index) => (
                <div key={index} className="mb-3">
                  <p className="font-semibold text-gray-800">{option.type}</p>
                  <p className="text-gray-600 text-sm">
                    {option.condition} —{" "}
                    <span className="italic">{option.delivery_time}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Included */}
            <div className="bg-yellow-50 border border-yellow-100 p-5 rounded-xl">
              <h2 className="text-2xl font-semibold text-yellow-700 mb-3">
                {t("details.included")}
              </h2>

              <ul className="list-disc list-inside text-gray-700">
                {service.details.includes?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ---------- Airport Transfers Section ---------- */}
        {service.transfers && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              {t("details.transferOptions")}
            </h2>

            <div className="space-y-4">
              {service.transfers.map((tItem) => (
                <div
                  key={tItem.id}
                  className="border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center"
                >
                  <div className="text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {tItem.vehicle}
                    </h3>
                    <p className="text-gray-600 text-sm">{tItem.route}</p>
                  </div>

                  <div className="flex items-center gap-4 mt-3 sm:mt-0">
                    <span className="text-blue-700 font-semibold text-lg">
                      {tItem.price}
                    </span>

                    <a
                      href={`https://wa.me/+905334667667?text=${encodeURIComponent(
                        tItem.message
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full"
                    >
                      💬 {t("details.bookNow")}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WhatsApp Button */}
        <div className="flex justify-center mt-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow transition-transform transform hover:scale-105"
          >
            💬 {t("details.moreOnWhatsapp")}
          </a>
        </div>
      </div>
    </div>
  );
}
