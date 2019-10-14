import React from 'react'
import Country from './Country'

const SearchResults = ({ countries, onClick }) => {
  const results = () => {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }

    if (countries.length === 1) {
      return <Country country={countries[0]} />
    }

    const rows = countries.map((country, index) => 
      <li key={country.numericCode}>
        {country.name} <button onClick={() => onClick(index)}>show</button>
      </li>
    )
    return <ul>{rows}</ul>
  }
    
  return (
    <div>
      {results()}
    </div>
  )
}

export default SearchResults