import axios from "axios";

const createWeatherApiBaseUrl = (lat, lon) => {
  const key = import.meta.env.VITE_WEATHER_API_KEY;
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
};


const getCapitalWeather = (lat, lon) => {
  const baseURL = createWeatherApiBaseUrl(lat, lon);
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

export default { getCapitalWeather };