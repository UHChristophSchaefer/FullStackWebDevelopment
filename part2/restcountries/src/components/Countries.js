import React from 'react'

const Languages = ({languages}) => {
    return (
        <div>
            <h3>languages</h3>
            <ul>
                {languages.map(l =>
                    <li key={l.name}>{l.name}</li>
                )}
            </ul>
        </div>
    )
}

const Weather = ({country, weather}) => {
    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <div>
                <b>temperature: </b> {weather.temperature} Celsius
            </div>
            <img src={weather.icon} height="100"></img>
            <div>
            <b>wind: </b> speed: {weather.windSpeed} mph, direction {weather.windDir} 
            </div>
        </div>
    )
}


const Country  = ({country, getWeather, weather}) => {
    getWeather(country.capital)

    // console.log(weather)
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital: {country.capital}</div>
            <div>population: {country.population}</div>  
            <Languages languages= {country.languages}/>
            
            <img src={country.flag} height="150"></img>

            <Weather country={country} weather={weather}/>
        </div>
    )
}

const Countries  = ({ countries, selectCountry, getWeather, weather}) => {
    if(countries.length === 0){
        return (
            <div>
                No results for the current filter
            </div>
        )
    }
    else if(countries.length === 1){  
        return (
            <Country country={countries[0]} getWeather={getWeather} weather={weather}/>
        )
    }
    else if(countries.length > 10){
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    return (
        <div>
            {countries.map(c =>
                <div key={c.name}>
                    {c.name}
                    <button onClick={selectCountry} value={c.name}>show</button>
                </div> 
            )}
        </div>
    )
}

export default Countries