import axios from "axios";

const API_KEY= import.meta.env.VITE_SOME_KEY

console.log(API_KEY)

const url = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q='

const getAll = () => {
    const req = axios.get(`${url}/all`)
    return req.then(response => response.data)
}

const getCountry = (country) => {
    const req = axios.get(`${url}/name/${country}`)
    return req.then(response => response.data)
}


const getWeather = (country) => {
    const req = axios.get(`${weatherUrl}${country}&&appid=${API_KEY}`)
    return req.then(response => response.data)
}


export default {getAll, getCountry, getWeather}