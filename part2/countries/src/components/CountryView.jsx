const CountryView = ({ country }) => {
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
    </div>
  );
};

export default CountryView;
