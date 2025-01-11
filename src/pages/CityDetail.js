import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchImages } from "../services/pixabayService"; // Import the fetchImages function
import { fetchWeather } from "../services/openWeatherService"; // Import weather fetching service

const CityDetail = () => {
  const location = useLocation(); // Access the location object from react-router
  const { cityData } = location.state || {}; // Destructure cityData from state

  const [images, setImages] = useState([]); // State for storing city images
  const [loading, setLoading] = useState(true); // State for loading status
  const [slideIndex, setSlideIndex] = useState(0); // State for tracking the current slide
  const [weather, setWeather] = useState(null); // State for weather data
  const [weatherLoading, setWeatherLoading] = useState(true); // Loading status for weather data

  // Fetch images when the component mounts
  useEffect(() => {
    if (cityData) {
      const getImages = async () => {
        try {
          const fetchedImages = await fetchImages(cityData.city); // Fetch images using city name
          setImages(fetchedImages.slice(0, 10)); // Limit to 10 images
          setLoading(false); // Set loading to false once images are fetched
        } catch (error) {
          console.error("Error fetching images:", error);
          setLoading(false); // Set loading to false if there's an error
        }
      };

      getImages();
    }
  }, [cityData]);

  // Fetch weather data when the component mounts
  useEffect(() => {
    if (cityData) {
      const getWeather = async () => {
        try {
          const weatherData = await fetchWeather(cityData.city);
          setWeather(weatherData);
          setWeatherLoading(false); // Set loading to false once weather data is fetched
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setWeatherLoading(false); // Set loading to false if there's an error
        }
      };

      getWeather();
    }
  }, [cityData]);

  const plusSlides = (n) => {
    setSlideIndex((prevIndex) => (prevIndex + n + images.length) % images.length);
  };

  const currentSlide = (n) => {
    setSlideIndex(n);
  };

  if (!cityData) {
    return <p>City details not found.</p>;
  }

  if (loading || weatherLoading) {
    return <p>Loading...</p>;
  }

  // Helper function to convert UNIX timestamp to local time
  const convertToLocalTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="container mx-auto p-8 max-w-screen-lg">
      <h2 className="text-4xl text-center font-extrabold font-serif text-indigo-800 mb-6">
  {cityData.city}
</h2>


        {/* Weather Details */}
        <div className="py-8 bg-gradient-to-r from-teal-400 to-blue-500 p-6 rounded-lg shadow-lg mt-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Weather Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Temperature: {weather.main.temp}°C</p>
              <p className="font-medium">Feels Like: {weather.main.feels_like}°C</p>
              <p className="font-medium">Min Temp: {weather.main.temp_min}°C</p>
              <p className="font-medium">Max Temp: {weather.main.temp_max}°C</p>
            </div>
            <div>
              <p className="font-medium">Weather: {weather.weather[0].description}</p>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt="Weather icon"
                className="w-12 h-12"
              />
              <p className="font-medium">Humidity: {weather.main.humidity}%</p>
              <p className="font-medium">Wind Speed: {weather.wind.speed} m/s</p>
              <p className="font-medium">Wind Direction: {weather.wind.deg}°</p>
            </div>
          </div>
          <div className="mt-6">
            <p className="font-medium">Cloudiness: {weather.clouds.all}%</p>
            {weather.rain ? (
              <p className="font-medium">Rain: {weather.rain["1h"]} mm</p>
            ) : (
              <p className="font-medium">Rain forecast: {weather.rain ? "Yes" : "No"}</p>
            )}
            {weather.snow ? (
              <p className="font-medium">Snow: {weather.snow["1h"]} mm</p>
            ) : (
              <p className="font-medium">Snow forecast: {weather.snow ? "Yes" : "No"}</p>
            )}
            <p className="font-medium">Sunrise: {convertToLocalTime(weather.sys.sunrise)}</p>
            <p className="font-medium">Sunset: {convertToLocalTime(weather.sys.sunset)}</p>
          </div>
        </div>

        {/* Slideshow of images */}
        <div className="relative shadow-lg rounded-xl overflow-hidden bg-white mt-8">
          <div className="mySlides">
            {images.map((image, index) => (
              <div
                key={index}
                className="slide-item"
                style={{ display: index === slideIndex ? "block" : "none" }}
              >
                <img
                  src={image.webformatURL}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-72 object-cover rounded-md shadow-lg"
                  style={{ maxHeight: "400px", objectFit: "cover" }} // Fix the height and make the image cover the area
                />
              </div>
            ))}
          </div>

          {/* Buttons */}
          <a
            className="absolute left-0 inset-y-0 flex items-center -mt-32 px-4 text-white hover:text-gray-800 cursor-pointer text-3xl font-extrabold"
            onClick={() => plusSlides(-1)}
          >
            ❮
          </a>
          <a
            className="absolute right-0 inset-y-0 flex items-center -mt-32 px-4 text-white hover:text-gray-800 cursor-pointer text-3xl font-extrabold"
            onClick={() => plusSlides(1)}
          >
            ❯
          </a>

          {/* Image description */}
          <div className="text-center text-white font-light tracking-wider bg-gray-800 py-2 mt-4 rounded-b-xl">
            <p id="caption" className="text-xl font-semibold"></p>
          </div>

          {/* Smaller images under description */}
          <div className="flex justify-center space-x-4 py-4">
            {images.map((image, index) => (
              <div key={index} className="w-20 h-20">
                <img
                  className="description w-full h-full object-cover rounded-md cursor-pointer border-2 border-gray-300 opacity-70 hover:opacity-100 hover:border-indigo-600"
                  src={image.webformatURL}
                  onClick={() => currentSlide(index)}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ objectFit: "cover" }} // Ensures images fill the space
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityDetail;
