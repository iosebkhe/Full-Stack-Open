import PropTypes from "prop-types";
import weatherServices from "../services/weather.js";
import { useEffect, useState } from "react";
import WeatherDisplay from "./WeatherDisplay.jsx";

const SingleCountry = ({ country }) => {
  const [countryCapitalWeather, setCountryCapitalWeather] = useState({});

  // Destructure latitude and longitude from country data
  const { capitalInfo: { latlng } } = country;
  const [lan, lon] = latlng;

  // Fetch weather data when component mounts or lat/lng change
  useEffect(() => {
    // Fetch weather data from a service
    weatherServices.getCapitalWeather(lan, lon).then(capitalWeather => setCountryCapitalWeather(capitalWeather));
  }, [lan, lon]);

  return (
    <div key={country.cca3}>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area} km²</p>
      <p>languages</p>
      <ul>
        {Object.values(country.languages).map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <img width={200} src={country.flags.png} alt={country.name.common} />
      </div>

      <h2>Weather in {country.capital}</h2>
      <WeatherDisplay data={countryCapitalWeather} />
    </div>
  );
};

SingleCountry.propTypes = {
  country: PropTypes.object
};

export default SingleCountry;