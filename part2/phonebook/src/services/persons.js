import axios from "axios";
const baseUrl = "/api/persons";

const list = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (payload) => {
  return axios.post(baseUrl, payload).then((response) => response.data);
};

const update = (id, payload) => {
  return axios
    .put(`${baseUrl}/${id}`, payload)
    .then((response) => response.data);
};

const destroy = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};

export default { list, create, update, destroy };
