import { useState, useEffect } from "react";

import countryService from "./services/country";
import List from "./components/List";

function App() {
  const [countries, setCountries] = useState();
  const [search, setSearch] = useState("");

  useEffect(() => {
    countryService.getAll().then((data) => setCountries(data));
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
      find countries <input value={search} onChange={handleSearch} />
      <List array={filtered} handleShow={setSearch} />
    </div>
  );
}

export default App;
