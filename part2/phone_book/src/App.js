import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm '
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState('success')

  useEffect(() => {
    personService.getAll().then(persons => setPersons(persons));
  }, [])

  const handleNewNameChange = event => {
    setNewName(event.target.value);
  }

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value);
  }

  const handleFilterValue = event => {
    setFilterValue(event.target.value);
  }

  const addPerson = event => {
    event.preventDefault();

    if (persons.some(item => item.name === newName)) {
      let person = persons.find(item => item.name === newName);

      person = { ...person, number: newNumber };

      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {
        updatePerson(person);
      }

      return;
    } else {
      const newPerson = { name: newName, number: newNumber };

      personService.create(newPerson).then(res => setPersons([...persons, res]));
      setMessage(`Add ${newName}`);
      setType('success');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }

    setNewName('');
    setNewNumber('');
  }

  const updatePerson = person => {
    personService.update(person).then(res => {
      console.log(res);
      const newData = persons.map(item => item.id === res.id ? res : item);

      setPersons(newData);
      setMessage(`Update ${newName}`);
      setType('success');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
    }).catch(err => {
      console.log(err);
      setMessage(`the person '${person.name}' was already deleted from server`);
      setType('error');
      setTimeout(() => {
        setMessage(null);
      }, 2000);
      setPersons(persons.filter(item => item.id !== person.id));
    })
  }

  const deletePerson = person => {
    return () => {
      if (window.confirm(`Delete ${person.name} ?`)) {
        personService.remove(person.id).then(() => {
          const data = persons.filter(item => item.id !== person.id);
          setPersons(data);
          setMessage(`Delete ${person.name}`);
          setType('success');
          setTimeout(() => {
            setMessage(null);
          }, 2000);
        });
      }
    }
  }

  const PersonFormProps = {
    newName,
    newNumber,
    handleNewNameChange,
    handleNewNumberChange,
    addPerson,
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter filterValue={filterValue} handleFilterValue={handleFilterValue} />

      <h2>Add a new</h2>
      <PersonForm {...PersonFormProps} />

      <h2>Numbers</h2>
      <Persons persons={persons} filterValue={filterValue} deletePerson={deletePerson} />
    </div>
  )
}

export default App