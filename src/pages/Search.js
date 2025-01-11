import React, { useState, useEffect } from "react";
import { fetchWeather } from "../services/openWeatherService";
import { fetchImages } from "../services/pixabayService";
import ImageCard from "../components/ImageCard";

const Search = () => {
  const [query, setQuery] = useState(""); // For the search input
  const [searchResults, setSearchResults] = useState([]); // Store search results
  const [loading, setLoading] = useState(false); // Loading state
  const [randomCities, setRandomCities] = useState([]); // Store random Moroccan cities
  const [randomCityWeather, setRandomCityWeather] = useState([]); // Weather data for random cities

  const moroccanCities = [
    "Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", "Agadir",
    "Chefchaouen", "Essaouira", "Ouarzazate", "Meknes", "Tetouan", "Nador"
  ];

  // Fetch weather and images for random cities
  useEffect(() => {
    const fetchCitiesWeather = async () => {
      const selectedCities = [];
      const weatherData = [];

      // Fetch weather and images for all 12 Moroccan cities
      for (let city of moroccanCities) {
        selectedCities.push(city);
        try {
          const weather = await fetchWeather(city); // Get weather data
          const images = await fetchImages(city); // Get images for the city
          
          weatherData.push({
            city: weather.name,
            temperature: weather.main.temp,
            description: weather.weather[0].description,
            windSpeed: weather.wind.speed,
            humidity: weather.main.humidity,
            icon: `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`,
            image: images[0]?.webformatURL, // Get the first image from Pixabay
          });
        } catch (error) {
          console.error(`Error fetching data for ${city}:`, error);
        }
      }

      setRandomCities(selectedCities);
      setRandomCityWeather(weatherData); // Set weather data for random cities
    };

    fetchCitiesWeather();
  }, []);

  // Handle the search form submission
  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) return; // Return early if no query

    setLoading(true); // Set loading state to true

    try {
      // Fetch weather data for searched city
      const weatherData = await fetchWeather(query);
      
      // Fetch images for the searched city
      const imageData = await fetchImages(query);

      // Format the search results
      const formattedResults = imageData.map(image => ({
        image: image.webformatURL,
        city: weatherData.name,
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp.toFixed(1), // Convert temperature to Celsius
        windSpeed: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
      }));

      setSearchResults(formattedResults); // Set search results
    } catch (error) {
      console.error("Error fetching search data:", error);
    } finally {
      setLoading(false); // Set loading state to false after fetch is complete
    }
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <form onSubmit={handleSearch} className="flex items-center">
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </form>
      </div>

      {/* Loading state */}
      {loading && <p className="text-center">Loading...</p>}

      {/* Display Moroccan Cities and Their Weather, if no search results are shown */}
      {!searchResults.length && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Weather and Images of Moroccan Cities</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {randomCities.length > 0 && randomCities.map((city, index) => (
              <ImageCard key={index} data={{
                image: randomCityWeather[index]?.image || "default-image.jpg", // Image fallback
                city: city,
                description: randomCityWeather[index]?.description || "Loading...",
                temperature: randomCityWeather[index]?.temperature || "Loading...",
                windSpeed: randomCityWeather[index]?.windSpeed || "Loading...",
                humidity: randomCityWeather[index]?.humidity || "Loading...",
                icon: randomCityWeather[index]?.icon || "default-icon.png"
              }} />
            ))}
          </div>
        </div>
      )}

      {/* Display Search Results */}
      {!loading && searchResults.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {searchResults.map((data, index) => (
              <ImageCard key={index} data={data} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
