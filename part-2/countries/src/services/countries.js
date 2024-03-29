import axios from "axios";

const baseURL = "https://restcountries.com/v3.1/all";

const getAllCountries = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

export default { getAllCountries };
