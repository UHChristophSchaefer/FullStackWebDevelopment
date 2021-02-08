import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter.js'
import Countries from './components/Countries.js'


const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ countryFilter, setCountryFilter ] = useState('')
  const [ weather, setWeather] = useState({}) 

  const api_key = process.env.REACT_APP_API_KEY

  // get persons from server
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = countries.filter(c => c.name.toLowerCase().includes(countryFilter.toLowerCase()))

  const selectCountry = (event) => {
    event.preventDefault()
    setCountryFilter(event.target.value)
  }

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const GetWeather = (location) => {
     // get persons from server
     useEffect(() => {
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`)
        .then(response => {
          
          const weatherObject = {
            location: location,
            temperature: response.data.current.temperature,
            icon: response.data.current.weather_icons[0],
            windSpeed: response.data.current.wind_speed,
            windDir: response.data.current.wind_dir
          }

          // console.log(weatherObject)
          setWeather(weatherObject) 
        })
    }, [])    
  }

  return (
    <div>
      <Filter 
        countryFilter={countryFilter} 
        handleFilterChange={handleFilterChange} />

      <Countries countries={countriesToShow} selectCountry={selectCountry} getWeather={GetWeather} weather={weather}/>
    </div>
  )
}

export default App