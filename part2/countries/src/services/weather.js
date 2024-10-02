import axios from "axios";

const apiKey = import.meta.env.VITE_SOME_KEY;
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;

const getWeather = (countryName) => {
  return axios
    .get(`${baseUrl}&q=${countryName}&appid=${apiKey}`)
    .then((response) => response.data);
};

const weatherImgSrc = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

export default { getWeather, weatherImgSrc };
