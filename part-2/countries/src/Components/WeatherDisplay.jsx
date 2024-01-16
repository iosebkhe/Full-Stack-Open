import PropTypes from "prop-types";

const WeatherDisplay = ({ data }) => {
  const celsiusTemp = data.main?.temp ? Number((data.main.temp - 273.15).toFixed(2)) : null;
  const windSpeed = data.wind?.speed ?? null;
  const weatherIcon = data.weather?.[0]?.icon;

  return (
    <div>
      <p>temperature {celsiusTemp} Celsius</p>
      <div>
        {weatherIcon && <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt={weatherIcon} />}
      </div>
      <p>wind {windSpeed} m/s</p>
    </div>
  );
};

WeatherDisplay.propTypes = {
  data: PropTypes.object
};

export default WeatherDisplay;