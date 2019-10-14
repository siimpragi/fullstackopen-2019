import React from 'react'

const Persons = ({ persons, removePerson }) => {
  const rows = () => {
    return persons.map(person =>
      <li key={person.id}>
        {person.name} {person.number} {" "}
        <button onClick={() => removePerson(person.id, person.name)}>
          delete
        </button>
      </li>
    )
  }

  return (
    <ul>
      {rows()}
    </ul>
  )
}

export default Persons