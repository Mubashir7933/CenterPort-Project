import ServicesList from "./components/ServicesList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">
        Center Port Hotel
      </h1>
      <ServicesList />
    </div>
  );
}
