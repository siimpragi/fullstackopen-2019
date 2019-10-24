import React from 'react'

const Filter = ({ value, onChange }) => (
  <div>
    <label htmlFor="filter">Filter shown with: </label>
    <input id="filter" value={value} onChange={onChange} />
  </div>
)

export default Filter