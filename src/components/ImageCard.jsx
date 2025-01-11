import { useNavigate } from "react-router-dom"; // Import useNavigate

const ImageCard = ({ data }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCardClick = () => {
    // Navigate to CityDetail page with the city name as a parameter
    navigate(`/city-detail/${data.city}`, { state: { cityData: data } });
  };

  return (
    <div
      className="max-w-xs bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition duration-500 cursor-pointer"
      onClick={handleCardClick} // Add click handler
    >
      {/* Image Section with Overlay Icon and Temperature */}
      <div className="relative w-64 h-40">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={data.image}
          alt={data.city}
        />
        {/* Weather Icon */}
        <img
          className="absolute top-2 left-2 w-12 h-12"
          src={data.icon}
          alt={`${data.city} weather icon`}
        />
        {/* Temperature Label */}
        <p className="absolute top-2 right-2 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded">
          {data.temperature}°C
        </p>
      </div>

      {/* City Name */}
      <h1 className="mt-4 text-[rgb(59,130,246)] text-2xl font-bold">
        {data.city}
      </h1>

      {/* Weather Description */}
      <p className="text-gray-600 text-sm mt-2">{data.description}</p>

      {/* Additional Weather Details */}
      <div className="my-4">
        <p className="text-gray-600 text-sm">Wind Speed: {data.windSpeed} m/s</p>
        <p className="text-gray-600 text-sm">Humidity: {data.humidity}%</p>
      </div>
    </div>
  );
};

export default ImageCard;
