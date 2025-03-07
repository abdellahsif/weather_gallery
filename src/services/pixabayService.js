import axios from "axios";

const PIXABAY_API_KEY = process.env.REACT_APP_PIXABAY_API_KEY; // Use environment variable
const PIXABAY_BASE_URL = "https://pixabay.com/api/";

export const fetchImages = async (query) => {
  try {
    const response = await axios.get(PIXABAY_BASE_URL, {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: "photo",
        per_page: 12, // Number of results per page
      },
    });
    return response.data.hits; // Return image data
  } catch (error) {
    console.error("Error fetching images from Pixabay:", error);
    throw error;
  }
};
