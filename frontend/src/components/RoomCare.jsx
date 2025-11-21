import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_BASE_URL } from "../config";

export default function RoomCare() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const whatsappNumber = "+905334667667";

  const cleaningOptions = [
    { id: 1, label: t("room.cleaningMorning"), message: t("room.cleaningMorningMsg") },
    { id: 2, label: t("room.cleaningAfternoon"), message: t("room.cleaningAfternoonMsg") },
  ];

  const addons = [
    { id: 1, name: t("room.extraTowels"), message: t("room.extraTowelsMsg") },
    { id: 2, name: t("room.linenChange"), message: t("room.linenChangeMsg") },
    { id: 3, name: t("room.deepCleaning"), message: t("room.deepCleaningMsg") },
  ];

  return (
    <div
      className={`min-h-screen bg-gray-50 flex justify-center items-start py-16 px-6 ${
        i18n.language === "ar" ? "rtl" : ""
      }`}
    >
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-6 hover:underline"
        >
          ← {t("details.back")}
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          {t("room.title")}
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-8">
          {t("room.description")}
        </p>

        {/* Included */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
            {t("room.whatsIncluded")}
          </h2>

          <ul className="list-disc list-inside text-gray-600 text-md space-y-1">
            <li>{t("room.inc1")}</li>
            <li>{t("room.inc2")}</li>
            <li>{t("room.inc3")}</li>
            <li>{t("room.inc4")}</li>
          </ul>
        </div>

        {/* Preferred Cleaning Time */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            {t("room.cleaningTime")}
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {cleaningOptions.map((opt) => (
              <button
                key={opt.id}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition"
                onClick={() =>
                  window.open(
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(opt.message)}`,
                    "_blank"
                  )
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Add-ons */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
            {t("room.addons")}
          </h2>

          <div className="space-y-3">
            {addons.map((addon) => (
              <div
                key={addon.id}
                className="border rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between items-center"
              >
                <span className="text-gray-700 text-md font-medium">
                  {addon.name}
                </span>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(addon.message)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-0 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full inline-block"
                >
                  💬 {t("room.request")}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Eco-friendly note */}
        <p className="text-sm text-gray-500 text-center mb-10">
          {t("room.ecoNote")}
        </p>

        {/* WhatsApp main button */}
        <div className="flex justify-center mt-10">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              t("room.mainMessage")
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow transition-transform hover:scale-105"
          >
            💬 {t("room.contactBtn")}
          </a>
        </div>

      </div>
    </div>
  );
}
