import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const person = persons.find((element) => element.name === newName);
    if (person === undefined) {
      setPersons(
        persons.concat({
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        }),
      );
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to the phonebook`);
    }
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);

    setFilteredPersons(
      persons.filter((element) =>
        element.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
    console.log(filteredPersons);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <p>
        filter show with
        <input value={search} onChange={handleSearch} />
      </p>
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
          <div>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          number:{" "}
          <div>
            <input
              value={newNumber}
              onChange={(e) => setNewNumber(e.target.value)}
            />{" "}
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
