
const Weather = ({weather}) => {

    console.log(weather)
    return (

        <div>
            <h1>Weather in {weather.name}</h1>
            <div>Temperature : {weather.temp} Celcius</div>
            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
            <div>Wind: {weather.wind} m/s </div>
        </div>

    )

}

export default Weather