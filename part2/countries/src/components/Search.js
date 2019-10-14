import React from 'react'

const Search = ({ onChange, value }) => (
  <div>
    <label htmlFor="search">find countries </label>
    <input
      id="search"
      onChange={onChange}
      value={value}
    />
  </div>
)

export default Search