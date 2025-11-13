import { useNavigate } from "react-router-dom";

export default function RoomCareDetails() {
  const navigate = useNavigate();

  const whatsappNumber = "1234567890"; // replace with your hotel number

  const cleaningOptions = [
    { id: 1, label: "Morning (9 AM - 12 PM)" },
    { id: 2, label: "Afternoon (12 PM - 3 PM)" },
  ];

  const addons = [
    {
      id: 1,
      name: "Extra Towels",
      message: "I would like extra towels for my room.",
    },
    {
      id: 2,
      name: "Linen Change Today",
      message: "Please schedule a linen change for my room today.",
    },
    {
      id: 3,
      name: "Deep Cleaning",
      message: "Please schedule a deep cleaning for my room.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-16 px-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-6 hover:underline"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          Housekeeping Service
        </h1>

        {/* Optional Image */}
        {/* <img
          src="/images/room_cleaning.jpg"
          alt="Housekeeping Service"
          className="my-6 w-full rounded-lg object-cover shadow-sm"
        /> */}

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed text-center mb-8">
          Enjoy a spotless and refreshing room environment every day. Our
          housekeeping team ensures your comfort through daily cleaning,
          towel replacement, and linen care.
        </p>

        {/* What’s Included */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
            What’s Included
          </h2>
          <ul className="list-disc list-inside text-gray-600 text-md space-y-1">
            <li>Daily towel replacement</li>
            <li>Bed making and linen change (every 2 days)</li>
            <li>Bathroom cleaning and trash removal</li>
            <li>Dusting and floor vacuuming</li>
          </ul>
        </div>

        {/* Cleaning Time Options */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Preferred Cleaning Time
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {cleaningOptions.map((opt) => (
              <button
                key={opt.id}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition"
                onClick={() =>
                  window.open(
                    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `I would like my room cleaned in the ${opt.label.toLowerCase()}.`
                    )}`,
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
            Add-ons
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
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                    addon.message
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 sm:mt-0 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-full inline-block"
                >
                  💬 Request
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Eco-Friendly Note */}
        <p className="text-sm text-gray-500 text-center mb-10">
          🌿 Help us save water and energy — hang your towels to reuse them.
          Towels placed on the floor will be replaced automatically.
        </p>

        {/* WhatsApp Contact Button */}
        <div className="flex justify-center mt-10">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              "I would like to request housekeeping service for my room."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full shadow transition-transform transform hover:scale-105"
          >
            💬 Contact Housekeeping
          </a>
        </div>
      </div>
    </div>
  );
}
