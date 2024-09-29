import { useState } from "react";

import Form from "./components/Form";
import Search from "./components/Search";
import List from "./components/List";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [search, setSearch] = useState("");
  const [newPerson, setPerson] = useState({ name: "", number: "" });

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
