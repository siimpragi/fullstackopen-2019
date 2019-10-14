import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  // TODO: refactor everything :-)
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [errorMessage, setErrorMessage] = useState()
  const [successMessage, setSuccessMessage] = useState()

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (newName === '' || newNumber === '') return

    const foundPerson = persons.find(person => person.name === newName)
    if (foundPerson) {
      return updatePerson(foundPerson.id, foundPerson.name)
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(() => {setSuccessMessage()}, 2000)
      })
  }

  const updatePerson = (id, name) => {
    if (!window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) return

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .update(id, personObject)
      .then(updatedPerson => {
        setPersons(persons.map(p => p.id === id ? updatedPerson : p))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(`Updated ${updatedPerson.name}`)
        setTimeout(() => {setSuccessMessage()}, 2000)
      })
      .catch(() => {
        setPersons(persons.filter(p => p.id !== id))
        setNewName('')
        setNewNumber('')
        setErrorMessage(`Information of ${name} has already been removed from server`)
        setTimeout(() => {setErrorMessage()}, 2000)
      })
  }

  const removePerson = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
        setSuccessMessage(`Removed ${name}`)
        setTimeout(() => {setSuccessMessage()}, 2000)
      })
      .catch(() => {
        setPersons(persons.filter(p => p.id !== id))
        setErrorMessage(`Information of ${name} has already been removed from server`)
        setTimeout(() => {setErrorMessage()}, 2000)
      })
  }

  const personFilter = (person) => {
    const { name } = person
    return name.toLowerCase().includes(newFilter.toLowerCase())
  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type="error" message={errorMessage} />
      <Notification type="success" message={successMessage} />
      <Filter
        value={newFilter}
        onChange={handleFilterChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        onSubmit={addPerson}
        name={{value: newName, onChange: handleNameChange}}
        number={{value: newNumber, onChange: handleNumberChange}}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons.filter(personFilter)}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App