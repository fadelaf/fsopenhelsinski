import { useState } from 'react'
import SearchForm from './components/searchFrom'
import { useEffect } from 'react'
import api from './server/api'
import Country from './components/Country'
import CountryList from './components/CountryList'

function App() {
  const [count, setCount] = useState(0)
  const [countries, setCountries] = useState(null)
  const [searchCountry, setSearch] = useState('')
  const [country, setCountry] = useState(null)
  const [filterCountry, setFilter] = useState([])
  const [weather, setWeather] = useState({})
  const [capital, setCapital] = useState('')

  useEffect(() => {


        api.getAll()
        .then(response => {
          setCountries(response.map(data => data.name.common))
        })


        // api.getWeather('Helsinki')
        // .then(response => {
        //   console.log(response)
        // })


  },[])

  useEffect(() => {

      const capitalWeather = (capital) => {
        api.getWeather(capital)
        .then(response => {
          console.log(response)
          const weatherObj = {
            name: response.name,
            temp: Math.round((response.main.temp - 273.15)* 100)/100,
            icon: response.weather[0].icon,
            wind: response.wind.speed
          }

          setWeather(weatherObj)

        })
      }


      const getCountryDetail = (country) => {

          api.getCountry(country)
          .then( response => {

            console.log(response)

            const countryObj  = {

              name: response.name.common,
              capital: response.capital[0],
              area: response.area,
              languages: response.languages,
              flags: response.flags.png

            } 
            console.log(countryObj)
            setCountry(countryObj)
            // setCapital(countryObj.capital)
            capitalWeather(response.capital[0])
          })
          .catch(error => {console.log(error)})

      }

      

      if (searchCountry !== ''){

        console.log(searchCountry)
        const exactMatch = countries.find(country => 
        country.toLowerCase() === searchCountry.toLowerCase())

        console.log(exactMatch)

        if (exactMatch) {

          getCountryDetail(exactMatch)
          // capitalWeather(capital)

        } else {
          
          const partialMatches = countries.filter(country => 
          country.toLowerCase().includes(searchCountry.toLowerCase()))

          // console.log(partialMatches)


          if (partialMatches.length === 1) {

            getCountryDetail(partialMatches[0])
            // capitalWeather(capital)

          } 

      }
    
    }
  

  },[searchCountry, countries])

  if(!countries){
    return null
  } 
  
  const filter = searchCountry !== '' ? countries.filter(country => country.toLowerCase().includes(searchCountry.toLowerCase())) : []

  return (
    <div>
      <SearchForm setSearch={setSearch} searchCountry={searchCountry} countries={countries}/>
      <div>
        { filter.length > 10 ? 'Too many matches, specify another filter' 
          : (filter.length <= 10 && filter.length > 1) ? filter.map(country => <CountryList country={country} setSearch={setSearch}/>) 
            : (filter.length === 1) ? <Country country={country} weather={weather}/> :<></>
        }
      </div>
    </div>
  )
}

export default App
