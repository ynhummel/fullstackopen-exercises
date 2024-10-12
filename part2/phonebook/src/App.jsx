import { useState, useEffect } from "react";

import Form from "./components/Form";
import Search from "./components/Search";
import List from "./components/List";
import Notification from "./components/Notification";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const [newPerson, setPerson] = useState({ name: "", number: "" });
  const [notification, setNotification] = useState(null);
  const [notifyError, setNotifyError] = useState(false);

  useEffect(() => {
    personService.list().then((data) => setPersons(data));
  }, []);

  const filteredPersons = persons.filter((element) => {
    if (element !== null) {
      return element.name.toLowerCase().includes(search.toLowerCase());
    }
  });

  const notify = (text, isError) => {
    isError ? setNotifyError(true) : setNotifyError(false);

    setNotification(text);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = persons.find((element) => element.name === newPerson.name);

    if (person === undefined) {
      createPerson();
    } else {
      updatePerson(person);
    }
  };

  const createPerson = () => {
    personService
      .create(newPerson)
      .then((justCreated) => {
        setPersons(persons.concat(justCreated));
        notify(`Added ${justCreated.name}`, false);
      })
      .catch((error) => notify(error.response.data.error, true));

    setPerson({ name: "", number: "" });
  };

  const updatePerson = (person) => {
    if (
      confirm(
        `${newPerson.name} is already added to the phonebook. replace the old number with a new one?`,
      )
    ) {
      personService
        .update(person.id, newPerson)
        .then((updatedPerson) => {
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : updatedPerson)),
          );
          notify(
            `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`,
            false,
          );
        })
        .catch((error) => {
          if (error.name === "AxiosError") {
            notify(error.response.data.error, true);
            return;
          }
          notify(
            `informations about ${person.name} has already been removed from server`,
            true,
          );
          setPersons(filteredPersons.filter((p) => p.id !== person.id));
        });
    }
  };

  const handleDelete = (person) => () => {
    if (confirm(`Delete ${person.name}`))
      personService
        .destroy(person.id)
        .then(() =>
          setPersons(filteredPersons.filter((p) => p.id !== person.id)),
        )
        .catch((error) => {
          notify(
            `informations about ${person.name} has already been removed from server`,
            true,
          );
          setPersons(filteredPersons.filter((p) => p.id !== person.id));
        });
  };

  const handleSearch = (e) => setSearch(e.target.value);

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification} error={notifyError} />
      <Search onChange={handleSearch} />
      <h2>add a new</h2>
      <Form onSubmit={handleSubmit} obj={newPerson} setObj={setPerson} />
      <h2>Numbers</h2>
      <List array={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
