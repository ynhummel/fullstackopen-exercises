import { useState, useEffect } from "react";

import weatherService from "../services/weather";
import Weather from "./Weather";

const CountryView = ({ country }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    weatherService
      .getWeather(country.name.common)
      .then((data) => setWeatherInfo(data));
  }, [country.name.common]);

  if (weatherInfo === null) return null;

  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital} <br />
      area {country.area}
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width={150} />
      <Weather capital={country.capital} info={weatherInfo} />
    </div>
  );
};

export default CountryView;
