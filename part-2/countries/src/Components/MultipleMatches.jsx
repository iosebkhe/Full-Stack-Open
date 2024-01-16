import { useState } from "react";
import PropTypes from "prop-types";
import SingleCountry from "./SingleCountry";

const MultipleMatches = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      {countries.map((country) => (
        <p key={country.cca3}>
          {country.name.common}
          <button onClick={() => handleSelectedCountry(country)}>show</button>
        </p>
      ))}

      {selectedCountry && <SingleCountry country={selectedCountry} />}
    </>
  );
};

MultipleMatches.propTypes = {
  countries: PropTypes.array
};

export default MultipleMatches;