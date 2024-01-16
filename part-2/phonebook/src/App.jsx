import { useState, useEffect } from 'react';
import personServices from "./services/persons";
import PersonForm from './Components/PersonForm';
import Filter from './Components/Filter';
import Persons from './Components/Persons';
import Person from './Components/Person';
import Notification from './Components/Notification';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    personServices.getAllPersons().then(allPersons => {
      setPersons(allPersons);
    });
  }, []);


  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handlePersonFilter = (event) => {
    setFilterName(event.target.value);
  };


  // update Person number 
  const updatePersonNumber = (existingPerson, newNumber) => {
    const updatedPersonObject = { ...existingPerson, number: newNumber };

    personServices.updatePerson(existingPerson.id, updatedPersonObject)
      .then((updatedPerson) => {
        setPersons(persons.map(person => (person.id === updatedPerson.id ? updatedPerson : person)));
        setNewName("");
        setNewNumber("");
      }).catch(error => {
        setMessage(`${error.response.data.error}`);
        setMessageType("error");
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      });
  };

  // add new person
  const addPerson = (event) => {
    event.preventDefault();

    // update user object if person's name and user input name are equal
    // and user confirms the update
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmMsg = `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`;

      if (window.confirm(confirmMsg)) {
        updatePersonNumber(existingPerson, newNumber);
      }

    } else {
      // If user input name is unique create a new person
      const newPersonObject = {
        name: newName,
        number: newNumber,
      };

      personServices.createPerson(newPersonObject).then((returnedNewPerson) => {
        setPersons(persons.concat(returnedNewPerson));
        setMessage(`Added ${returnedNewPerson.name}`);
        setMessageType("success");
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      }).catch(error => {
        setMessage(`${error.response.data.error}`);
        setMessageType("error");
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  // delete person
  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);

    if (confirm(`Delete ${personToDelete.name}?`)) {
      personServices.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id));
        setMessage(`${personToDelete.name} has been deleted`);
        setMessageType("success");
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      }).catch(error => {
        setMessage(`${error.response.data.error}`);
        setMessageType("error");
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
        }, 5000);
      });
    }
  };

  // filter persons based on user input
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );



  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter onFilterChange={handlePersonFilter} filterName={filterName} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <ul>
        {filterName === ''
          ?
          <Persons persons={persons} onDeletePerson={deletePerson} />
          :
          <Person
            filteredPersons={filteredPersons}
            onDeletePerson={deletePerson}
          />
        }
      </ul>
    </div >
  );
};

export default App;