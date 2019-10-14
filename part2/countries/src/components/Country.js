import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  // ugh ...
  const [weather, setWeather] = useState()
  const API_KEY = process.env.REACT_APP_API_KEY
  const {name, capital, population, languages, flag} = country

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [API_KEY, capital])

  const rows = () => languages.map(
    ({iso639_1, name}) => <li key={iso639_1}>{name}</li>
  )

  const weatherInfo = () => {
    if (!weather) return <p>No info</p>

    const {temperature, weather_icons, wind_speed, wind_dir} = weather.current
    return (
      <div>
        <p>
          <strong>temperature: </strong>
          {temperature} Celsius
        </p>
        {
          weather_icons.map((icon, index) =>
            <img key={index} alt="weather icon" src={icon} />
          )
        }
        <p>
          <strong>wind: </strong>
          {wind_speed} kph direction {wind_dir}
        </p>
      </div>
    )
  }

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>

      <h2>Languages</h2>
      <ul>
        {rows()}
      </ul>
      <img
        alt={`flag of ${name}`}
        src={flag}
        style={{width: 100 + "px", height: "auto"}}
      />

      <h2>Weather in {capital}</h2>
      {weatherInfo()}
    </div>
  )
}

export default Country