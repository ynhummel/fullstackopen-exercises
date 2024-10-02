import { useState, useEffect } from "react";
import axios from "axios";

const List = ({ array }) => {
  if (array.length > 10)
    return <div>"Too many matches, specify another filter"</div>;

  if (array.length === 1) return <CountryView country={array[0]} />;

  return (
    <div>
      {array.map((country) => (
        <div key={country.name.common}>{country.name.common}</div>
      ))}
    </div>
  );
};

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

function App() {
  const [countries, setCountries] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => setCountries(response.data));
  }, []);

  if (!countries) {
    return null;
  }

  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <div>
      find countries <input onChange={handleSearch} />
      <List array={filtered} />
    </div>
  );
}

export default App;
