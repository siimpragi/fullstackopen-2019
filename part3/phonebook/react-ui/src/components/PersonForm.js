import React from 'react'

const PersonForm = ({ onSubmit, name, number }) => (
  <form onSubmit={onSubmit}>
    <div>
      <label htmlFor="name">name: </label>
      <input 
        id="name"
        value={name.value}
        onChange={name.onChange}
        required
      />
    </div>
    <div>
      <label htmlFor="number">number: </label>
      <input
        id="number"
        value={number.value}
        onChange={number.onChange}
        required
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm