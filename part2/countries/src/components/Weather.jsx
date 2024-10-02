import weatherService from "../services/weather";

const Weather = ({ capital, info }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p> temperature {info.main.temp} Celcius </p>
      <img src={weatherService.weatherImgSrc(info.weather[0].icon)} />
      <p> wind {info.wind.speed} m/s </p>
    </div>
  );
};

export default Weather;
