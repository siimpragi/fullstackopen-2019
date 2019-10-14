import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Search from './components/Search'
import SearchResults from './components/SearchResults'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [searchContent, setSearchContent] = useState('')

  const handleSearchContentChange = (event) => {
    setSearchContent(event.target.value)
    setFilteredCountries(getFilteredCountries(event.target.value))
  }

  const showCountry = (index) => {
    setFilteredCountries([filteredCountries[index]])
  }

  const getFilteredCountries = (searchTerm) => countries.filter(
    country => {
      const countryName = country.name.toLowerCase()
      return countryName.includes(searchTerm.toLowerCase())
    }
  )

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Search
        onChange={handleSearchContentChange}
        value={searchContent}
      />
      <SearchResults
        countries={filteredCountries}
        onClick={showCountry}
      />
    </div>
  )
}

export default App;