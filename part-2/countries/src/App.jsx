import { useState, useEffect } from 'react';
import countryServices from "./services/countries.js";
import SingleCountry from './Components/SingleCountry';
import MultipleMatches from './Components/MultipleMatches';
import TooManyMatches from './Components/TooManyMatches';
import NoMatches from './Components/NoMatches';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState("");

  useEffect(() => {
    if (countryName) {
      countryServices.getAllCountries().then(allCountries => setCountries(allCountries));
    }
  }, [countryName]);

  const handleCountryNameChange = (event) => {
    setCountryName(event.target.value);
  };

  const filtered = countries.filter(country => country.name.common.toLowerCase().includes(countryName.toLowerCase()));

  return (
    <>
      <div>
        find countries <input type="text" name="country" id="country" onChange={handleCountryNameChange} value={countryName} />
      </div>

      <div>
        {countryName.length > 0 &&
          (
            filtered.length === 0 ? (
              <NoMatches />
            ) : filtered.length === 1 ? (
              <SingleCountry country={filtered[0]} />
            ) : filtered.length > 1 && filtered.length < 10 ? (
              <MultipleMatches countries={filtered} />
            ) : (
              <TooManyMatches />
            )
          )
        }
      </div>
    </>
  );
}

export default App;
