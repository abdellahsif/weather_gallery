import axios from "axios";

const OPENWEATHER_API_KEY = "a6dcb2470631003d5200f166bcc999fa"; // Replace with your API key
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const fetchWeather = async (city) => {
  try {
    const response = await axios.get(OPENWEATHER_BASE_URL, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: "metric", // Use "imperial" for Fahrenheit
      },
    });
    return response.data; // Return weather data
  } catch (error) {
    console.error("Error fetching weather from OpenWeather:", error);
    throw error;
  }
};
