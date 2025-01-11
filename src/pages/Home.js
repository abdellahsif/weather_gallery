import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchWeather } from "../services/openWeatherService";
import { fetchImages } from "../services/pixabayService";
import ImageCard from "../components/ImageCard";

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const cities = ["Casablanca", "Tokyo", "Milan", "Riyadh"];

    const fetchData = async () => {
      try {
        const weatherResults = await Promise.all(
          cities.map(async (city) => {
            const weather = await fetchWeather(city);
            const images = await fetchImages(city);

            return {
              city: weather.name,
              temperature: weather.main.temp,
              description: weather.weather[0].description,
              windSpeed: weather.wind.speed,
              humidity: weather.main.humidity,
              icon: `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
              image: images[0]?.webformatURL,
            };
          })
        );
        setWeatherData(weatherResults);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching weather or images:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle button click to navigate to /search
  const handleButtonClick = () => {
    navigate("/search");
  };

  return (
    <div className="container mx-auto p-4">
      {/* Section 1: Enhanced Landing Section */}
      <div className="text-center bg-gradient-to-r from-teal-400 to-blue-500 p-12 rounded-3xl shadow-2xl mb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 -z-10"></div>

        {/* Updated h1 with new color */}
        <h1 className="text-5xl font-extrabold mb-4 text-[rgba(253,224,71,255)]">
          Discover Weather & Gallery
        </h1>

        {/* Updated paragraph text */}
        <p className="text-lg font-medium mb-6 max-w-3xl mx-auto text-gray-200">
          Get real-time weather updates and explore stunning, high-quality
          images from cities across the globe.
        </p>
        <p className="text-md mb-8 text-gray-100">
          Whether you’re planning a trip or just curious, start your journey
          now!
        </p>

        {/* Button with click handler to navigate */}
        <button
          className="px-8 py-3 bg-[rgba(253,224,71,255)] text-white font-semibold rounded-full shadow-lg transform hover:scale-105 hover:bg-[#fcc441] transition duration-300 ease-in-out"
          onClick={handleButtonClick} // Handle click
        >
          Start Exploring
        </button>
      </div>

      {/* Section 2: Weather & Images Gallery */}
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {loading ? (
          <p className="text-lg text-gray-700">Loading weather and images...</p>
        ) : (
          weatherData.map((data, index) => (
            <ImageCard key={index} data={data} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
