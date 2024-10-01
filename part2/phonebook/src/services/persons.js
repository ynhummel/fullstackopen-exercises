import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const list = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (payload) => {
  return axios.post(baseUrl, payload).then((response) => response.data);
};

const destroy = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { list, create, destroy };
