import { useState, useEffect } from "react";
import axios from "axios";

import Form from "./components/Form";
import Search from "./components/Search";
import List from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [newPerson, setPerson] = useState({ name: "", number: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  const filteredPersons = persons.filter((element) =>
    element.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const person = persons.find((element) => element.name === newPerson.name);
    if (person === undefined) {
      setPersons(
        persons.concat({
          name: newPerson.name,
          number: newPerson.number,
          id: persons.length + 1,
        }),
      );
      setPerson({ name: "", number: "" });
    } else {
      alert(`${newPerson.name} is already added to the phonebook`);
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <div>
      <h1>Phonebook</h1>
      <Search onChange={handleSearch} />
      <h2>add a new</h2>
      <Form onSubmit={handleSubmit} obj={newPerson} setObj={setPerson} />
      <h2>Numbers</h2>
      <List array={filteredPersons} />
    </div>
  );
};

export default App;
