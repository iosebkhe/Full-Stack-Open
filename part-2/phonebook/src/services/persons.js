import axios from "axios";

// Previous url was: http://localhost:3001/
// I've copied build of this app to its backend and therefore I needed relative url
// changed vite.config.js file and added proxy
const baseURL = "api/persons";

const getAllPersons = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const createPerson = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then(response => response.data);
};

const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseURL}/${id}`, newObject);
  return request.then(response => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then(response => response);
};

export default { getAllPersons, createPerson, updatePerson, deletePerson };